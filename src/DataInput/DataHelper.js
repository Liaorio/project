import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const Name = "Name", name = "name";
const Value = "Value", value = "value";
const inputTableRows = ["length", "width"];

function getRowData(dataObj) {
    let rowData = [];
    inputTableRows.forEach(key => {
        let row = {};
        row[name] = key;
        row[value] = dataObj.hasOwnProperty(key) ? dataObj[key] : "";
        rowData.push(row);
    });
    return rowData;
}

function getAgGridTable(rowData, columnDefs, styles, updateFunc) {
    return (
        <div className="ag-theme-balham" style={{ height: styles.height }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                suppressContextMenu={true}
                enableCellChangeFlash={true}
                domLayout={ styles.height ? "autoHeight" : "normal"}
                onCellValueChanged={updateFunc}
            />
        </div>
    )
}

export function getDataInputTable(dataObj, id, handleUpdateInfo) {
    let rowData = getRowData(dataObj);
    let columnDefs = [
        { headerName: Name, field: name, width: 100 },
        { headerName: Value, field: value, editable: true, width: 400 },
    ];
    let styles = {
        height: 100
    };
    let updateFunc = (params) => {
        handleUpdateInfo(id, params.data)
    };
    return getAgGridTable(rowData, columnDefs, styles, updateFunc);
}