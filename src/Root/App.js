import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import HomePage from '../Home/Home';
import DataInputPage from '../DataInput/DataInput';

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <Router>
//           <Route exact path="/" component={HomePage} />
//           <Route path="/dataInput" component={DataInputPage}></Route>
//         </Router>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//       redirect: (route) => {
//           dispatch(push(route));
//       },
//   };
// };

// export default withRouter(connect(null, mapDispatchToProps)(App));

const App = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/" component={HomePage} />
      <Route path="/dataInput" component={DataInputPage} />
    </div>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
