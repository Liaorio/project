import React from "react";

import { Input } from 'antd';

export default class DataInputView extends React.Component {

    handleInput(e) {
        let newValue = e.target.value;
        this.props.handleInputData(newValue);
    }

    render() {
        let value = this.props.data;

        return (
            <Input placeholder="Input" onChange={(e) => this.handleInput(e)} value={value} style={{width: '150px'}} />
        );
    }
}