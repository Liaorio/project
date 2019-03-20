import React from 'react';
import { Button } from 'antd';
import './Home.css';
import logo from './logo.svg'

class DataInput extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="Ap-header"></header>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Project</h1>
                <Button type="primary" href="/dataInput">Start</Button>
            </div>
        )
    }
}

export default DataInput;