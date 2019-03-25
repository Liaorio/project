import React, { Component } from 'react';
import { Map, TileLayer, Marker, ImageOverlay } from 'react-leaflet';
import { Collapse, Empty} from 'antd';
import * as L from 'leaflet';
import ImageUpload from './Component/ImageUpload';
import 'leaflet-draw';

import './DataInput.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const defaultMapAddress = "http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
const defaultAttribution = '&copy; by <a target="_top" href="http://stamen.com">Stamen Design</a>';
const iconUrl = "http://krimsonsalon.com/img/icon_address.png";

export default class DataInputView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLocation: null
		}
		this.findCoordinates = this.findCoordinates.bind(this);
	}

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		const drawControl = new L.Control.Draw({
			position: 'topright',
			draw: {
				polyline: false,
				polygon: true,
				circle: false,
				marker: false,
			},
			edit: {
				featureGroup: drawnItems,
				remove: true,
			},
		});
		map.addControl(drawControl);
		map.on(L.Draw.Event.CREATED, (e) => {
			//const type = e.layerType;
			const layer = e.layer;
			drawnItems.addLayer(layer);

			let leafId = `${layer['_leaflet_id']}`;
			layer.on('click', () => {
				this.handleExpandFolder([leafId]);
			});
			this.props.handleInputData({
				id: `${leafId}`,
				name: 'test'
			});
			console.log('GEO JSONNNN', drawnItems.toGeoJSON());
			//console.log('GET THEM LAYERS', drawnItems.getLayers());
		});
		map.on(L.Draw.Event.EDITED, (e) => {
			//const layers = e.layers;
			//console.log(layers);
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
		let { data, activeId, mapOrPictureAddress } = this.props;
		const Panel = Collapse.Panel;

		let mapAdress = mapOrPictureAddress ? mapOrPictureAddress : defaultMapAddress;
		let zoomVal = mapOrPictureAddress ? 0 : 15;
		
		let mapLayer = 
			<TileLayer url={mapAdress} attribution={defaultAttribution}>
				{this.state.currentLocation 
					? <Marker id={1} key={1} position={this.state.currentLocation} icon={L.icon({ iconUrl: "http://krimsonsalon.com/img/icon_address.png" })} /> 
					: <span></span>
				}
			</TileLayer>

		return (
			<div>
				<div className = "map-container" >
					<Map 
						ref={m => { this.leafletMap = m;}} 
						center={this.state.currentLocation ? this.state.currentLocation :[42.617970, -70.670862]} 
						zoom={zoomVal}>
						{mapOrPictureAddress 
							? <ImageOverlay url={mapOrPictureAddress} bounds={[[40, -74], [40, -74]]} />
							: mapLayer
						}
					</Map>
					<div className = "info-container" >
						{data.length > 0 
							? <Collapse onChange = {key => this.handleExpandFolder(key)} activeKey = {activeId}> 
								{data.map((item, index) =>
									<Panel header = {item.id} key = {`${item.id}`}>
										<p> {item.id} </p> 
									</Panel>)
								} 
							</Collapse> 		
							: <Empty description="No position selected..." style={{marginTop: '30vh'}}/>
						}		
					</div>
				</div>
				<ImageUpload handleUpload={this.props.handleUploadLayer} />
			</div>
		);
	}
}