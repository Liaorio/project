import React, { Component } from 'react';
import { Map, TileLayer, Marker, ImageOverlay } from 'react-leaflet';
import { Collapse, Empty, Radio, Button, Input, Modal } from 'antd';
import * as L from 'leaflet';
import ImageUpload from './Component/ImageUpload';
import * as DataHelper from './DataHelper';
import ResultTable from './Component/ResultTables';
import 'leaflet-draw';
import './DataInput.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

//const defaultMapAddress = "http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
const defaultMapAddress = "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
const defaultAttribution = '&copy; by <a target="_top" href="http://stamen.com">Stamen Design</a>';
const iconUrl = "http://krimsonsalon.com/img/icon_address.png";
const api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const apiKey = "AIzaSyC8iIraUUTwAjRCzjcIz81KVX7ML1l0IV8";


const water = "water", ground = "ground", house = "house", hole = "hole";
const Water = "Water", Ground = "Ground", House = "House", Hole = "Hole";
const tileTypeObj = Object.freeze({ Map: 1, Picture: 2 });
const layerTypeObj = Object.freeze({ house: House, hole: Hole, water: Water, ground: Ground });


export default class DataInputView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLocation: null,
		}
		this.findCoordinates = this.findCoordinates.bind(this);
		this.handleOpenErrorDialog = this.handleOpenErrorDialog.bind(this);
		DataHelper.overRideLeaflet(L);
	}

	addMarker(map, layer, type, title) {
		layer.bindPopup(`<div class=${type}>${title}</div>`, { closeOnClick: false, autoClose: false });
		map.addLayer(layer);
		layer.openPopup();
	}

	componentDidMount() {
		const map = this.leafletMap.leafletElement;
		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		const drawControl = new L.Control.Draw({
			position: 'topright',
			draw: {
				water: {
					shapeOptions: {
						color: 'green',
						type: water
					},
				},
				ground: {
					shapeOptions: {
						color: 'blue',
						type: ground
					},
				},
				house: {
					shapeOptions: {
						color: 'red',
						type: house
					},
				},
				hole:{
					shapeOptions: {
						color: 'orange',
						type: hole
					},
				},
				polyline: false,
				marker: false,
				circlemarker: false,
			},
			edit: {
				featureGroup: drawnItems,
				remove: true,
			},
		});
		map.addControl(drawControl);
		map.on(L.Draw.Event.CREATED, (e) => {
			const type = e.layer.options.type ? e.layer.options.type : e.layerType;
			const layer = e.layer;	
			const allLayers = drawnItems.getLayers();
			let index = 1;
			allLayers.forEach(item => {
				if(item.options.type === type) {
					index++;
				}
			});

			const title =  layerTypeObj[type] + " " + index;

			this.addMarker(map, layer, type, title);			
			drawnItems.addLayer(layer);

			if (type === water) {
				// L.GeometryUtil.distance(_map, _firstLatLng, _secondLatLng); calculate distance
				var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
				console.log(seeArea);
			}

			let leafId = `${layer['_leaflet_id']}`;
			layer.on('click', () => {
				this.handleExpandFolder([leafId]);
			});
			this.props.handleInputData({
				id: `${leafId}`,
				type: type,
				title: title,
				length: "",
				width: "",
			});
			//console.log('GEO JSONNNN', drawnItems.toGeoJSON());
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
			error => this.handleOpenErrorDialog(error.message), {
				enableHighAccuracy: true,
				timeout: 60000,
				maximumAge: 1000
			}
		);
	};

	handleExpandFolder(key) {
		this.props.handleExpandFolder(key);
	}

	handleOpenErrorDialog(eMessage) {
		Modal.error({
			title: 'Request Geo Info Failed...',
			content: eMessage,
		  });
	}

	handleSearchAddress(address) {
		if(address === "") {
			this.handleOpenErrorDialog("Please input address");
		} else {
			let requestData = address.split(' ').join('+');
			fetch(`${api}${requestData}&key=${apiKey}`)
				.then(response => {
					if(!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				}).then(json => {
					if(json.error_message) {
						throw Error(json.error_message);
					}
					const location = json.results[0].geometry.location;
					this.setState({
						currentLocation: [location.lat, location.lng]
					});
				}).catch(error => {
					this.handleOpenErrorDialog(error.message);
				});
		}	
	}

	render() {
		let { data, activeId, layerType, pictureUrl, resultData } = this.props;
		let usePicture = layerType === tileTypeObj.Picture
		const Panel = Collapse.Panel, RadioGroup = Radio.Group, Search = Input.Search;
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
						<div>
							<RadioGroup onChange={e => this.props.handleSelectLayerType(e.target.value)} value={layerType}>
								<div>
									<Radio value={tileTypeObj.Map}>Use Map</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
									<Search placeholder="Search On Map" onSearch={value => this.handleSearchAddress(value)} style={{ width: 500 }} enterButton="Search"/>
								</div>
								<br/>
								<div style={{ display: 'flex' }}>
									<Radio value={tileTypeObj.Picture} disabled={pictureUrl == null}>Use Picutre</Radio>
									<ImageUpload handleUpload={this.props.handleUploadPicture} pictureUrl={pictureUrl} />
								</div>								
							</RadioGroup>
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
									<Panel header={item.title} key={`${item.id}`}>
										{DataHelper.getDataInputTable(item, `${item.id}`, this.props.handleUpdateInfo)} 
									</Panel>)
								} 
							</Collapse> 		
							: <Empty description="No position selected..." style={{marginTop: '30vh'}}/>
						}
						<div className="cal-button-panel">
							<Button type="primary" icon="form" disabled={DataHelper.isVaildToCalculate(data)} onClick={() => this.props.handleGetResult()}>Calculate</Button>
						</div>
					</div>
				</div>
				{ resultData ? <ResultTable data={resultData} /> : <span></span> }
			</div>
		);
	}
}