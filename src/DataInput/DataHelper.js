import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import SingleSelectRenderer from './Component/SingleSelectRenderer';

const SoilInfiltrationRate = "Soil Infiltration Rate <15mm/hr";
const SurfaceSlope = "Surface Slope (%)";
const Climate = "Climate is vulnerable to cold and snowy winters";
const Depth = "Depth of groundwater and bedrock(cm) <220";
const ProtectionArea = "Within 2 yr time-of-travel wellhead protection area";
const PollutionHotSpot = "Pollution Hot Spot";
const HeavyTrafficLoading = "Heavy Traffic Loading";
const LandUse = "Land Use";


export const data = {
    [SoilInfiltrationRate]: 0,
    [SurfaceSlope]: null,
    [Climate]: 0,
    [Depth]: 0,
    [ProtectionArea]: 0,
    [PollutionHotSpot]: 0,
    [HeavyTrafficLoading]: 0,
    [LandUse]: null
};


const frameworkComponents = {
    singleSelectRenderer: SingleSelectRenderer,
}
 
function getInputRowData(columnDefs, dataObj) {
    let rowData = {};
    columnDefs.forEach(columnDef => {
        rowData[columnDef.field] = dataObj[columnDef.field];
    });
    return [rowData];
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

function getAgGridTable(rowData, columnDefs, defaultColDef, styles = { height: 'auto' }) {
    return (
        <div className="ag-theme-balham info-table" style={{ height: styles.height, width: 1500 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                domLayout={styles.height ? "autoHeight" : "normal"}
                onGridReady={gridReady}
                frameworkComponents={frameworkComponents}
                headerHeight={50}
                suppressContextMenu={true}
            />
        </div>
    )
}


//------------------------------export functions-----------------------------//


export function getDataInputTable(dataObj, id, handleUpdateInfo) {
    let updateFunc = (name, value) => {
        handleUpdateInfo(id, name, value)
    };
    let columnDefs = [
        { headerName: SoilInfiltrationRate, field: SoilInfiltrationRate, cellRenderer: "singleSelectRenderer", name: SoilInfiltrationRate, options: { "yes": 1, "no": 0 } },
        { headerName: SurfaceSlope, field: SurfaceSlope, cellRenderer: "singleSelectRenderer", name: SurfaceSlope, options: { "<1.0": 0, ">5.0": 1, ">10": 2, ">15": 3 } },
        { headerName: Climate, field: Climate, cellRenderer: "singleSelectRenderer", name: Climate, options: { "yes": 1, "no": 0 } },
        { headerName: Depth, field: Depth, cellRenderer: "singleSelectRenderer", name: Depth, options: { "yes": 1, "no": 0 }, width: 300 },
        { headerName: ProtectionArea, field: ProtectionArea, cellRenderer: "singleSelectRenderer", name: ProtectionArea, options: { "yes": 1, "no": 0 } },
        { headerName: PollutionHotSpot , field: PollutionHotSpot, cellRenderer: "singleSelectRenderer", name: PollutionHotSpot, options: { "yes": 1, "no": 0 } },
        { headerName: HeavyTrafficLoading, field: HeavyTrafficLoading, cellRenderer: "singleSelectRenderer", name: HeavyTrafficLoading, options: { "yes": 1, "no": 0 } },
        { headerName: LandUse, field: LandUse, cellRenderer: "singleSelectRenderer", name: LandUse, options: { "Residential": "Residential", "Commercial/Industrial": "Commercial/Industrial", "Row": "Row"}, width: 300  }
    ];
    let defaultColDef = { editable: true, cellValueChange: updateFunc, filter: false };
    let rowData = getInputRowData(columnDefs, dataObj);
    let styles = { height: 100 };
    
    return getAgGridTable(rowData, columnDefs, defaultColDef, styles, updateFunc);
}


export function isVaildToCalculate(data) {
    let result = data.length > 0 && data.every(item => Object.values(item).every(subItem => subItem !== ""));
    return !result;
}


export function getResultTables(sourceData) {
    // let rowData = getResultRowData(sourceData);
    // let columnDefs = [
    //     { headerName: Name, field: name },
    //     { headerName: Width, field: width },
    //     { headerName: Length, field: length },
    // ];
    // return getAgGridTable(rowData, columnDefs);
    return null;
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
            },
            // {
            //     enabled: this.options.polyline,
            //     handler: new L.Draw.Polyline(map, this.options.polyline),
            //     title: "Draw a ployline"
            // }
        ];
    };
}


export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}