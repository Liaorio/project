import React from 'react';
import { Button } from 'antd';
import './Home.css';
// import logo from './logo.svg'
import banner from './ce.jpg'

class DataInput extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <img src={banner} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to TR-Project</h1>
                <Button className="home-button" type="primary" href="/dataInput" size="large" icon="arrow-right" >Start</Button>
            </div>
        )
    }
}

export default DataInput;