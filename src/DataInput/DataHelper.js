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


function gridReady(params) {
    params.api.sizeColumnsToFit();
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
                onGridReady={gridReady}
            />
        </div>
    )
}

export function getDataInputTable(dataObj, id, handleUpdateInfo) {
    let rowData = getRowData(dataObj);
    let columnDefs = [
        { headerName: Name, field: name, width: 100 },
        { headerName: Value, field: value, editable: true },
    ];
    let styles = {
        height: 100
    };
    let updateFunc = (params) => {
        handleUpdateInfo(id, params.data)
    };
    return getAgGridTable(rowData, columnDefs, styles, updateFunc);
}


export function overRideLeaflet(L) {
    L.DrawToolbar.prototype.getModeHandlers = function (map) {
        return [
            {
                enabled: this.options.water,
                handler: new L.Draw.Polygon(map, this.options.water),
                title: "Draw a Water",
            },
            {
                enabled: this.options.ground,
                handler: new L.Draw.Polygon(map, this.options.ground),
                title: "Draw a Ground"
            },
            {
                enabled: this.options.house,
                handler: new L.Draw.Rectangle(map, this.options.house),
                title: "Draw a House"
            },
            {
                enabled: this.options.hole,
                handler: new L.Draw.Circle(map, this.options.hole),
                title: "Draw a Hole"
            }
        ];
    };
}