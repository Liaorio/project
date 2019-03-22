import React from "react";
import {  Map, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './DataInput.css';
const outer = [[50.505, -29.09], [52.505, 29.09]]
const inner = [[49.505, -2.09], [53.505, 2.09]]


export default class DataInputView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bounds: outer,
          }
    }
    onClickInner = () => {
        this.setState({ bounds: inner })
      }
    
      onClickOuter = () => {
        this.setState({ bounds: outer })
      }

      render() {
        return (
            <div style={{width: '200px'}}>
                <Map bounds={this.state.bounds}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Rectangle
                    bounds={outer}
                    color={this.state.bounds === outer ? 'red' : 'white'}
                    onClick={this.onClickOuter}
                    />
                    <Rectangle
                    bounds={inner}
                    color={this.state.bounds === inner ? 'red' : 'white'}
                    onClick={this.onClickInner}
                    />
                </Map>
            </div>
        )
      }
   
}