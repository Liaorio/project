import React from 'react';

import { Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HomePage from '../Home/Home';
import DataInputPage from '../DataInput/DataInput';

class Root extends React.Component {
	render() {
		return ( 
			<div>
				<Route exact path="/" component={HomePage} /> 
				<Route path="/dataInput" component={DataInputPage} />  
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		redirect: (route) => {
			dispatch(push(route));
		},
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));