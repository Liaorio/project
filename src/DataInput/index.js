
const INPUT_DATA = 'DataInput/INPUT_DATA';
const EXPAND_FOLDER = 'DataInput/EXPAND_FOLDER';
const UPLOAD_LAYER = 'DataInput/UPLOAD_LAYER';
const SELECT_LAYER_TYPE = 'DataInput/SELECT_LAYER_TYPE';
const UPDATE_INFO = 'DataInput/UPDATE_INFO';
const GET_RESULT = 'DataInput/GET_RESULT';
const CLEAR_LAYERS_BY_ID = 'DataInput/CLEAR_LAYERS_BY_ID';

export const inputData = (data) => ({
    type: INPUT_DATA,
    data
});

export const expandFolder = (id) => ({
    type: EXPAND_FOLDER,
    id
});

export const uploadPicture = (pictureUrl) => ({
    type: UPLOAD_LAYER,
    pictureUrl
});

export const selectLayerType = (layerType) => ({
    type: SELECT_LAYER_TYPE,
    layerType: layerType
});

export const updateInfo = (id, name, value) => ({
    type: UPDATE_INFO,
    id, name, value
});

export const clearLayersById = idList => ({
    type: CLEAR_LAYERS_BY_ID,
    idList
});

export const getResult = () => ({
    type: GET_RESULT
})


const initialState = {
    data: [],
    activeId: [],
    layerType: 1,
    pictureUrl: null,
    resultData: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INPUT_DATA:
            return {
                ...state,
                data: [...state.data, action.data],
                activeId: [...state.activeId, action.data.id]
            };

        case EXPAND_FOLDER:
            let activedIds = [...state.activeId], newId = action.id;
            if (Array.isArray(newId)) {
                activedIds = newId;
            } else {
                if(!activedIds.includes(newId)) {
                    activedIds.push(newId);
                }
            }
            return {
                ...state,
                activeId: activedIds
            }

        case SELECT_LAYER_TYPE:
            return {
                ...state,
                layerType: action.layerType
            }

        case UPLOAD_LAYER:
            return {
                ...state,
                pictureUrl: action.pictureUrl
            }
            
        case UPDATE_INFO:
            let _data = [...state.data];
            _data.forEach(item => {
                if(item.id === action.id) {
                    item[action.name] = action.value;
                }
            });
            return {
                ...state,
                data: _data
            }

        case CLEAR_LAYERS_BY_ID:
            let { idList } = action;
            let filteredData = state.data.filter(item => idList.includes(item.id));
            return {
                ...state,
                activeId: idList,
                data: filteredData
            }    

        case GET_RESULT:
            return {
                ...state,
                resultData: [...state.data]
            }

        default:
            return state;
    }
};