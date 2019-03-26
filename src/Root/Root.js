import React from 'react';

import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HomePage from '../Home/Home';
import DataInputPage from '../DataInput/DataInput';

class Root extends React.Component {
	render() {
		return ( 
			<Router>
				<Route exact path="/" component={DataInputPage} /> 
				<Route path="/home" component={HomePage} />  
			</Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);