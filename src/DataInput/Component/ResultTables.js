import React, { Component } from 'react';
import { Collapse } from 'antd';
import * as DataHelper from '../DataHelper';


export default class ResultTables extends Component {
    
	render() {
        const Panel = Collapse.Panel;
        let { data } = this.props; 
		return (
            <Collapse defaultActiveKey="1" className="result-container"> 
                <Panel header="Result Table 1" key="1">
                    {DataHelper.getResultTables(data)} 
                </Panel>
            </Collapse>
		);
	}
}