
const INPUT_DATA = 'DataInput/INPUT_DATA';
const EXPAND_FOLDER = 'DataInput/EXPAND_FOLDER';
const UPLOAD_LAYER = 'DataInput/UPLOAD_LAYER'

export const inputData = (data) => ({
    type: INPUT_DATA,
    data
});

export const expandFolder = (id) => ({
    type: EXPAND_FOLDER,
    id
});

export const uploadLayer = (layerAddress) => ({
    type: UPLOAD_LAYER,
    layerAddress
})

const initialState = {
    data: [],
    activeId: [],
    mapOrPictureAddress: null
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
        
        case UPLOAD_LAYER:
            return {
                ...state,
                mapOrPictureAddress: action.layerAddress
            }

        default:
            return state;
    }
};