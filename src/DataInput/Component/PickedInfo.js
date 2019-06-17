import React, { useState, useEffect } from "react";
import { Collapse, Empty, Button } from 'antd';
import * as DataHelper from '../DataHelper';

const Panel = Collapse.Panel;

const getCollapseObj = data => {
    let result = {};
    data.forEach(item => {
        if(result.hasOwnProperty(item.type)) {
            result[item.type].push(item);
        } else {
            result[item.type] = [item];
        }
    });
    return {infoDataObj: result, initialActiveGroup: Object.keys(result)};
}

const filterActiveGroup = (data, activeId) => {
    let activeGroup = data.filter(item => activeId.includes(item.id)).map(activeItem => activeItem.type);
    return [...new Set(activeGroup)];
}

const PickedInfoContainer = ({data, activeId, handleExpandFolder, handleGetResult, handleUpdateInfo}) => {
    const { infoDataObj, initialActiveGroup } = getCollapseObj(data);
    
    const [ activeGroup, setActiveGroup ] = useState(initialActiveGroup);
    useEffect(() => {setActiveGroup(filterActiveGroup(data, activeId))}, [activeId]);

    return (
        <div>
            {DataHelper.isObjectEmpty(infoDataObj) 
                ? <Empty description="No position selected..." style={{marginTop: '30vh'}}/>
                : <Collapse onChange={key => setActiveGroup(key)} activeKey={activeGroup}>
                    {Object.keys(infoDataObj).map(key => 
                        <Panel key={key} header={<h3 style={{ fontWeight: 900 }}>{key}</h3>}>
                            <Collapse onChange={key => handleExpandFolder(key)} activeKey={activeId}> 
                                {infoDataObj[key].map(item =>
                                <Panel header={item.title} key={`${item.id}`}>
                                    {DataHelper.getDataInputTable(item, `${item.id}`, handleUpdateInfo)} 
                                </Panel>)} 
                            </Collapse>
                        </Panel>
                    )}
                </Collapse>
            }
            <div className="cal-button-panel">
                <Button type="primary" icon="form" disabled={DataHelper.isVaildToCalculate(data)} onClick={handleGetResult}>Calculate</Button>
            </div>
        </div>
        
    )
}

export default PickedInfoContainer;