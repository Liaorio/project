
export const INPUT_DATA = 'DataInput/INPUT_DATA';

export const inputData = (data) => ({
    type: INPUT_DATA,
    data
});

const initialState = {
    data: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INPUT_DATA:
            return {
                ...state,
                data: action.data
            };

        default:
            return state;
    }
};