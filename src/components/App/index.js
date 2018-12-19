import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../containers/Login'
import MentorContainer from '../MentorContainer'
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Route path='/login' component={Login} /> */}
        <Route exact path='/' component={MentorContainer} />
        {/* <Route path='/edit-mentor' component={MentorCard} /> */}
        {/* <Route path='/mentor-profile' component={MentorProfile} /> */}
        {/* <Route path='/admin-dashboard' component={AdminDashboard} /> */}
      </div>
    );
  }
}

export default withRouter(App);