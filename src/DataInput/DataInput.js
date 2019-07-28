import { connect } from 'react-redux';
import DataInputView from './DataInputView';
import * as index from './index';

// redux selector
const mapStateToProps = state => ({
    ...state.DataInput
});

const mapDispatchToProps = dispatch => ({
    handleInputData: (data) => {
        dispatch(index.inputData(data));
    },
    handleExpandFolder: (id) => {
        dispatch(index.expandFolder(id));
    },
    handleUploadPicture: (url) => {
        dispatch(index.uploadPicture(url));
    },
    handleSelectLayerType: (layerType) => {
        dispatch(index.selectLayerType(layerType));
    },
    handleUpdateInfo: (id, name, value) => {
        dispatch(index.updateInfo(id, name, value));
    },
    handleClearLayersById: (idList) => {
        dispatch(index.clearLayersById(idList));
    },
    handleGetResult: () => {
        dispatch(index.getResult());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataInputView);
