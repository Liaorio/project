import React, { Component } from "react";
import { Select } from 'antd';
import * as constant from '../Component/Constant';

const { Option } = Select;
export default class SingleSelectRenderer extends Component {

    handleChange(name, val) {
        this.props.colDef.cellValueChange(name, val);
    }

    render() {
        let rowData = this.props.data;
        let columnData = this.props.colDef.cellRendererParams;
        let type = columnData.type;
        let basicInfo = constant.basicInfo;
        let characteristics = rowData[basicInfo[type].headerName];
        const options = basicInfo[type].optionsMap[characteristics];
        const optionsList = Object.keys(options).map(option => 
            <Option key={options[option]} value={options[option]}>{option}</Option>)
        return (
            <Select style={{ width: '100%', height: 20 }} onChange={val => this.handleChange(characteristics, val)} value={rowData.Value}>
                {optionsList}
            </Select>
        );
    }
};