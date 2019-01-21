import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { retrieveRelationships } from '../../thunks/fetchRelationships';
import { setToken } from '../../actions';
import './App.css';

export class App extends Component {

  componentDidMount = () => {
    let { 
      location, 
      retrieveMentors, 
      retrieveStudents, 
      retrieveRelationships,
      setToken
    } = this.props

    if(location.search !== '') {
      let cleanedToken = this.cleanToken(location.search)
      retrieveMentors();
      retrieveStudents(cleanedToken);
      retrieveRelationships(cleanedToken);
      setToken(cleanedToken)
    } else {
      return
    }
  }

  cleanToken = (urlParam) => {
    if(urlParam.startsWith('?token=')) {
      return urlParam.slice(7)
    } else {
      return
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
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
  retrieveStudents: (token) => dispatch(retrieveStudents(token)),
  retrieveRelationships: (token) => dispatch(retrieveRelationships(token)),
  setToken: (token) => dispatch(setToken(token))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));