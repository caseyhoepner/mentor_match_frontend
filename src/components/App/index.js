import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../containers/Login'
import AdminDashboard from '../../containers/AdminDashboard';
import MentorContainer from '../MentorContainer'
import PathError from '../PathError';
import NewMentorForm from '../../containers/NewMentorForm'
import { Route, withRouter, Switch } from 'react-router-dom';
import { retrieveMentors } from '../../thunks/fetchMentors';
import './App.css';

export class App extends Component {

  componentDidMount = () => {
    this.props.retrieveMentors();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path='/' component={MentorContainer} />
          <Route exact path='/new-mentor-form' component={NewMentorForm} />
          {/* <Route path='/edit-mentor' component={MentorCard} /> */}
          {/* <Route path='/mentor-profile' component={MentorProfile} /> */}
          <Route path='/admin-dashboard' component={AdminDashboard} />
          <Route component={PathError} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  mentors: state.mentors
})

export const mapDispatchToProps = (dispatch) => ({
  retrieveMentors: () => dispatch(retrieveMentors())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));





