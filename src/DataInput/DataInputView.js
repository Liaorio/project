import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet';
import * as L from 'leaflet';
import './DataInput.css';

import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const blueIcon = L.icon({ iconUrl: 'https://calendar.duke.edu/assets/v2016/icon-login.svg' });
const greenIcon = L.icon({ iconUrl: 'http://readyhedgeltd.com/wp-content/uploads/2016/09/home_icon-20.png' });
const redIcon = L.icon({ iconUrl: 'http://krimsonsalon.com/img/icon_address.png' });
const orangeIcon = L.icon({ iconUrl: 'https://ak1.ostkcdn.com//img/mxc/sn_review_star_full.svg' });

const events = [{
  title:'Sport Thing',
  description: 'the biggest sport thing ever',
  type: 'Sports',
  lat: 42.616841,
  lng: -70.671173,
  id: 'CAT',
},
{
	title:'Town Hall Meeting',
  description: 'Come one come all',
  type: 'Government',
  lat: 42.619281,
  lng: -70.669735,
  id: 'DOG',
}]

export default class DataInputView extends Component {

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new L.Control.Draw({
    position: 'topright',
    draw: {
      polyline: true,
      polygon: true,
      circle: false,
      marker: true,
    },
    edit: {
      featureGroup: drawnItems,
      remove: true,
    },
  });
  map.addControl(drawControl);
  map.on(L.Draw.Event.CREATED, (e) => {
    const type = e.layerType;
    const layer = e.layer;
    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }
    console.log('LAYER ADDED:', layer)
    if (layer.getRadius) {
			console.log('It\'s a circle');
    }
    drawnItems.addLayer(layer);
    
    console.log('GEO JSONNNN', drawnItems.toGeoJSON());
    console.log('GET THEM LAYERS', drawnItems.getLayers());
  });
  map.on(L.Draw.Event.EDITED, (e) => {
    const layers = e.layers;
    let countOfEditedLayers = 0;
    console.log('LAYER EDITED:', layers)
    layers.eachLayer((layer) => {
      countOfEditedLayers++;
    });
   });
  }
  
  handleClick(e) {
  	console.log(e);
  }
  
  getEventIcon(type) {
  switch (type) {
    case 'Sports':
      return greenIcon;
    case 'Music':
      return blueIcon;
    case 'Government':
      return redIcon;
    default:
      return orangeIcon;
  	}
	}

  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={[42.617970, -70.670862]}
          zoom={15}
        >
          <TileLayer
            url="http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
            
            attribution='&copy; <a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
          />
          {events.map(({ id, lat, lng, title, description, type }) => (
            <Marker
              id={id}
              key={id}
              position={[lat, lng]}
              icon={this.getEventIcon(type)}
              onClick={this.handleClick}
            >
              <Popup>
                <span>
                  {title}<br />
                  {description}
                </span>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}
