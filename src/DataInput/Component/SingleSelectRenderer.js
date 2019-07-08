import React, { Component } from "react";
import { Select } from 'antd';

const { Option } = Select;


export default class SingleSelectRenderer extends Component {

    handleChange(name, val) {
        this.props.colDef.cellValueChange(name, val);
    }

    render() {
        let className = this.props.colDef.width ? "extra-length": null;
        const options = this.props.colDef.options;
        const optionsList = Object.keys(options).map(option => 
            <Option key={options[option]} value={options[option]}>{option}</Option>)
        return (
            <Select className={className} onChange={v => this.handleChange(this.props.colDef.name, v)} value={this.props.value} style={{ width: 120 }}>
                {optionsList}
            </Select>
        );
    }
};