import React, { Component } from "react";
import { Select } from 'antd';
import * as helpers from '../DataHelper';

const { Option } = Select;
export default class SingleSelectRenderer extends Component {

    handleChange(name, val) {
        this.props.colDef.cellValueChange(name, val);
    }

    render() {
        let data = this.props.data;
        let characteristics = data["Site Characteristics"];
        const options = helpers.optionsMap[characteristics];
        const optionsList = Object.keys(options).map(option => 
            <Option key={options[option]} value={options[option]}>{option}</Option>)
        return (
            <Select style={{ width: 50, height: 20 }} onChange={val => this.handleChange(characteristics, val)} value={data.Value}>
                {optionsList}
            </Select>
        );
    }
};