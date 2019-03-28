import { connect } from 'react-redux';
import DataInputView from './DataInputView';
import * as index from './index';

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
    handleUpdateInfo: (id, newData) => {
        dispatch(index.updateInfo(id, newData));
    },
    handleClearAllLayer: () => {
        dispatch(index.claerAllLayer());
    },
    handleGetResult: () => {
        dispatch(index.getResult());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataInputView);
