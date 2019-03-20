import React from "react";
import { connect } from 'react-redux';

class DataInput extends React.Component {
    render() {
        return (
            <h1>This is test</h1>
        )
    }
}

export default connect(null, null)(DataInput);