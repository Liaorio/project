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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataInputView);
