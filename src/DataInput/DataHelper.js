import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

const SoilInfiltrationRate = "Soil Infiltration Rate";
const SurfaceSlope = "Surface Slope";
const Climate = "Climate is vulnerable to cold and snowy winters";
const Depth = "Depth of groundwater and bedrock(m)";
const ProtectionArea = "Within 2 yr time-of-travel wellhead protection area";
const PollutionHotSpot = "Pollution Hot Spot";
const HeavyTrafficLoading = "Heavy Traffic Loading";
const LandUse = "Land Use";
 
function getInputRowData(columnDefs, dataObj) {
    let rowData = {};
    columnDefs.forEach(columnDef => {
       rowData[columnDef.field] = null;
    });
 
    return [rowData];
}

function gridReady(params) {
    params.api.sizeColumnsToFit();
}

function getResultRowData(data) {
    //return data.map(item => { return { [name]: item.title, [width]: item.width, [length]: item.length }});
    return [];
}

function getAgGridTable(rowData, columnDefs, defaultColDef, styles = { height: 'auto' }, updateFunc = null) {
    return (
        <div className="ag-theme-balham" style={{ height: styles.height, width: 1500 }}>
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
                domLayout={ styles.height ? "autoHeight" : "normal"}
                onCellValueChanged={updateFunc}
                onGridReady={gridReady}
                headerHeight={50}
            />
        </div>
    )
}


//------------------------------export functions-----------------------------//


export function getDataInputTable(dataObj, id, handleUpdateInfo) {
    let columnDefs = [
        { headerName: SoilInfiltrationRate, field: SoilInfiltrationRate, width: 150 },
        { headerName: SurfaceSlope, field: SurfaceSlope, width: 150 },
        { headerName: Climate, field: Climate },
        { headerName: Depth, field: Depth },
        { headerName: ProtectionArea, field: ProtectionArea },
        { headerName: PollutionHotSpot , field: PollutionHotSpot },
        { headerName: HeavyTrafficLoading, field: HeavyTrafficLoading },
        { headerName: LandUse, field: LandUse }
    ];
    let defaultColDef = { editable: true };
    let rowData = getInputRowData(columnDefs, dataObj);
    let styles = { height: 100 };
    let updateFunc = (params) => {
        handleUpdateInfo(id, params.data)
    };
    console.log(rowData);
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