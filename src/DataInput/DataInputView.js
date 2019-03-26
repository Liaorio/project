import React, { Component } from 'react';
import { Map, TileLayer, Marker, ImageOverlay } from 'react-leaflet';
import { Collapse, Empty, Radio, Button } from 'antd';
import * as L from 'leaflet';
import ImageUpload from './Component/ImageUpload';
import * as DataHelper from './DataHelper';
import 'leaflet-draw';

import './DataInput.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

//const defaultMapAddress = "http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
const defaultMapAddress = "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const defaultAttribution = '&copy; by <a target="_top" href="http://stamen.com">Stamen Design</a>';
const iconUrl = "http://krimsonsalon.com/img/icon_address.png";
const layerTypeObj = Object.freeze({ Map: 1, Picture: 2 });

export default class DataInputView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLocation: null
		}
		this.findCoordinates = this.findCoordinates.bind(this);
		DataHelper.overRideLeaflet(L);
	}

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		const drawControl = new L.Control.Draw({
			position: 'topright',
			draw: {
				polygon: {
					allowIntersection: true,
					showArea: true,
					shapeOptions: {
						color: 'red'
					},
				},
				polyline: false,
				circle: true,
				marker: false,
				circlemarker: false,
				water: {
					allowIntersection: true,
					showArea: true,
					shapeOptions: {
						color: 'green',
						type: 'water'
					},
				},
			},
			edit: {
				featureGroup: drawnItems,
				remove: true,
			},
		});
		map.addControl(drawControl);
		map.on(L.Draw.Event.CREATED, (e) => {
			const type = e.layer.options.type ? e.layer.options.type : e.layerType;
			console.log(e);
			const layer = e.layer;


			if (type === 'rectangle') {
				layer.bindPopup('building');
				layer.setStyle({
					'fillColor': '#fffff'
				});
			}
			drawnItems.addLayer(layer);


			let leafId = `${layer['_leaflet_id']}`;
			layer.on('click', () => {
				this.handleExpandFolder([leafId]);
			});
			this.props.handleInputData({
				id: `${leafId}`,
				type: type,
				length: "",
				width: "",
			});
			//console.log('GEO JSONNNN', drawnItems.toGeoJSON());
			//console.log('GET THEM LAYERS', drawnItems.getLayers());
		});
		map.on(L.Draw.Event.EDITED, (e) => {
			//const layers = e.layers;
			//console.log(layers);
		});
		map.on(L.Draw.Event.DELETED, (e) => {
			this.props.handleClearAllLayer();
		});
		this.findCoordinates();
	}

	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			location => {
				this.setState({
					currentLocation: [location.coords.latitude, location.coords.longitude]
				});
			},
			error => alert(`Cannot get your location: ${error.message}`), {
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			}
		);
	};

	handleExpandFolder(key) {
		this.props.handleExpandFolder(key);
	}

	render() {
		let { data, activeId, layerType, pictureUrl } = this.props;
		let usePicture = layerType === layerTypeObj.Picture
		const Panel = Collapse.Panel, RadioGroup = Radio.Group;
		let zoomVal = usePicture ? 0 : 18;
		let centerValue = usePicture ? [0, 0] : (this.state.currentLocation ? this.state.currentLocation : [42, -70] );
    
		let mapLayer = 
			<div>
				<TileLayer url={defaultMapAddress} attribution={defaultAttribution} />
					{this.state.currentLocation 
						? <Marker id={1} key={1} position={this.state.currentLocation} icon={L.icon({ iconUrl: iconUrl })} /> 
						: <span></span>
					}
			</div>;

		return (
			<div className="wrapper">
				<Collapse defaultActiveKey="1" className="preset-container"> 
					<Panel header="Preset Info" key="1">
						<div style={{ display: 'flex' }}>
							<RadioGroup onChange={e => this.props.handleSelectLayerType(e.target.value)} value={layerType}>
								<Radio value={layerTypeObj.Map}>Use Map</Radio>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<Radio value={layerTypeObj.Picture} disabled={pictureUrl == null}>Use Picutre</Radio>
							</RadioGroup>
							<ImageUpload handleUpload={this.props.handleUploadPicture} pictureUrl={pictureUrl} />
						</div>
					</Panel>	
				</Collapse>
				<div className="map-container" >
					<Map 
						ref={m => { this.leafletMap = m;}} 
						center={centerValue} 
						zoom={zoomVal}>
						{usePicture 
							? <ImageOverlay url={pictureUrl} bounds={[[-200, -200], [200, 200]]} />
							: mapLayer
            			}
					</Map>
					<div className = "info-container">
						{data.length > 0 
							? <Collapse onChange={key => this.handleExpandFolder(key)} activeKey={activeId}> 
								{data.map(item =>
									<Panel header={item.type} key={`${item.id}`}>
										{DataHelper.getDataInputTable(item, `${item.id}`, this.props.handleUpdateInfo)} 
									</Panel>)
								} 
							</Collapse> 		
							: <Empty description="No position selected..." style={{marginTop: '30vh'}}/>
						}
						<div className="cal-button-panel">
							<Button type="primary" icon="form" disabled={data.length === 0}>Calculate</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}