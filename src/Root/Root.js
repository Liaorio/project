import React from 'react';

import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Layout } from 'antd';

import HomePage from '../Home/Home';
import DataInputPage from '../DataInput/DataInput';

const { Content, Footer } = Layout;

class Root extends React.Component {
	render() {
		return ( 
			<Layout className="layout">
				<Content>
					<Router>
						<Route exact path="/" component={DataInputPage} /> 
						<Route path="/home" component={HomePage} />  
					</Router>
				</Content>
				<Footer style={{ padding: 0, textAlign: 'center', height: '3vh' }}>
      				<span className="footerFont">TR Project ©2019 Created by <a href="Mailto: liaorio@gmail.com">Ao Li</a></span>
    			</Footer>
			</Layout>
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