const SoilInfiltrationRate = "Soil Infiltration Rate < 15mm/hr";
const SurfaceSlope = "Surface Slope (%)";
const Climate = "Climate is vulnerable to cold and snowy winters";
const Depth = "Depth of groundwater and bedrock(m) < 2.2";
const ProtectionArea = "Within 2 yr time-of-travel wellhead protection area";
const PollutionHotSpot = "Pollution Hot Spot";
const HeavyTrafficLoading = "Heavy Traffic Loading";
const LandUse = "Land Use";
const Site = "Site Characteristics";

const TreesAndRoads = "Trees and Roads on Site";
const DrainageArea = "Drainage Area > 0.8ha";
const DAorTA = "Drainage Area/Treated Area";
const FlowPathLenght = "Flow Path Length(m) < 5";
const Lot = "Lot Planning";

export const basicInfo = {
    water: {
        headerName: Site,
        dataConstructor: {
            [SoilInfiltrationRate]: 0,
            [SurfaceSlope]: null,
            [Climate]: 0,
            [Depth]: 0,
            [ProtectionArea]: 0,
            [PollutionHotSpot]: 0,
            [HeavyTrafficLoading]: 0,
            [LandUse]: null
        },
        optionsMap: {
            [SoilInfiltrationRate]: { "yes": 1, "no": 0 },
            [SurfaceSlope]: { "<1.0": 0, ">5.0": 1, ">10": 2, ">15": 3 },
            [Climate]: { "yes": 1, "no": 0 },
            [Depth]: { "yes": 1, "no": 0 },
            [ProtectionArea]: { "yes": 1, "no": 0 },
            [PollutionHotSpot]: { "yes": 1, "no": 0 },
            [HeavyTrafficLoading]: { "yes": 1, "no": 0 },
            [LandUse]: { "Residential": "Residential", "Commercial/Industrial": "Commercial/Industrial", "Row": "Row"}
        }
    },

    ground: {
        headerName: Lot,
        dataConstructor: {
            [TreesAndRoads]: 0,
            [DrainageArea]: null,
            [DAorTA]: 0,
            [FlowPathLenght]: 0,
        },
        optionsMap: {
            [TreesAndRoads]: { "yes": 1, "no": 0 },
            [DrainageArea]: { "yes": 1, "no": 0 },
            [DAorTA]: { ">1.2": 0, "<5": 1, ">20": 2},
            [FlowPathLenght]: { "yes": 1, "no": 0 },
        }
    },
}



export const rowHeight = 40;








