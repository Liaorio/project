import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import SingleSelectRenderer from './Component/SingleSelectRenderer';
import * as constant from './Component/Constant';

const frameworkComponents = {
    singleSelectRenderer: SingleSelectRenderer,
}
 
function getInputRowData(data) {
    let re = [];
    Object.keys(data).forEach(key => {
        if(key !== "id" && key !== "type" && key !== "title" ) {
            let rowData = {};
            rowData[constant.basicInfo[data.type].headerName] = key;
            rowData["Value"] = data[key];
            re.push(rowData);
        }
    });
    return re;
}

function gridReady(params) {
    params.api.sizeColumnsToFit();
}

/*
function getResultRowData(data) {
    //return data.map(item => { return { [name]: item.title, [width]: item.width, [length]: item.length }});
    return [];
}
*/

function getAgGridTable(rowData, columnDefs, defaultColDef) {
    const height = (rowData.length + 1) * constant.rowHeight;
    return (
        <div className="ag-theme-balham info-table" style={{ height: height }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                domLayout="normal"
                onGridReady={gridReady}
                frameworkComponents={frameworkComponents}
                suppressContextMenu={true}
                rowHeight={constant.rowHeight}
            />
        </div>
    )
}


//------------------------------export functions-----------------------------//


export function getDataInputTable(data, id, handleUpdateInfo) {
    let updateFunc = (name, value) => {
        handleUpdateInfo(id, name, value)
    };
    let type = data.type, basicInfo = constant.basicInfo;
    let columnDefs = [
        { headerName: basicInfo[type].headerName, field: basicInfo[type].headerName, width: 400 },
        { headerName: "Value", field: "Value", cellRenderer: "singleSelectRenderer", cellRendererParams: data }
    ];
    let defaultColDef = { cellValueChange: updateFunc, filter: false };
    let rowData = getInputRowData(data);
    return getAgGridTable(rowData, columnDefs, defaultColDef);
}


export function isVaildToCalculate(data) {
    let result = data.length > 0 && data.every(item => Object.values(item).every(subItem => subItem !== ""));
    return !result;
}


export function getResultTables(sourceData) {
    return null;
}


export function overRideLeaflet(L) {
    L.DrawToolbar.prototype.getModeHandlers = function (map) {
        return [
            {
                enabled: this.options.site,
                handler: new L.Draw.Polygon(map, this.options.site),
                title: "Draw a Site",
            },
            {
                enabled: this.options.lot,
                handler: new L.Draw.Polygon(map, this.options.lot),
                title: "Draw a Lot"
            },
        ];
    };
}


export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}