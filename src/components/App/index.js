import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../containers/Login'
import AdminDashboard from '../../containers/AdminDashboard';
import MentorContainer from '../MentorContainer'
import SuccessPage from '../SuccessPage'
import PathError from '../PathError';
import EditableMentor from '../../containers/EditableMentor';
import NewMentorForm from '../../containers/NewMentorForm';
import NewStudentForm from '../NewStudentForm';
import { Route, withRouter, Switch } from 'react-router-dom';
import { retrieveMentors } from '../../thunks/fetchMentors';
import { retrieveStudents } from '../../thunks/fetchStudents';

import './App.css';

export class App extends Component {

  componentDidMount = () => {
    this.props.retrieveMentors();
    this.props.retrieveStudents();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path='/' component={MentorContainer} />
          <Route exact path='/new-mentor-form' component={NewMentorForm} />
          <Route exact path='/new-student-form' component={NewStudentForm} />
          <Route path='/edit-mentor' render={() => <EditableMentor currentMentor={this.props.modalInfo} />} />
          {/* <Route path='/mentor-profile' component={MentorProfile} /> */}
          <Route path='/admin-dashboard' component={AdminDashboard} />
          <Route path='/success' component={SuccessPage} />
          <Route component={PathError} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  mentors: state.mentors,
  modalInfo: state.modalInfo
})

export const mapDispatchToProps = (dispatch) => ({
  retrieveMentors: () => dispatch(retrieveMentors()),
  retrieveStudents: () => dispatch(retrieveStudents())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));