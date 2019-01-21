import React, { Component } from 'react';
import './AdminMentorModal.css';
import { connect } from 'react-redux';
import { setMentorModal, updateChangedMentor, isEditable, addModalMentees } from '../../actions/mentor-actions';
import { makeStudentInactive } from '../../actions/student-actions';
import { postRelationship, patchRelationship, patchStudent, patchMentor } from '../../utils/api';
import { EditableMentor } from '../EditableMentor';
import { retrieveRelationships } from '../../thunks/fetchRelationships';
import { withRouter } from 'react-router-dom';

export class AdminMentorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMentor: {},
      menteeToAssign: '',
      mentees: []
    }
  }

  componentDidMount = () => {
    this.setState({ mentees: this.getMentees() })
  }

  handleClick = (event) => {
    let { name } = event.target
    let { currentMentor } = this.state;
    
    if (name === 'Edit') {
      let mentorObj = Object.assign({}, this.props.modalInfo)
      this.props.openEditMentor(true)
      this.setState({ currentMentor: mentorObj })
      this.props.history.push('/edit-mentor')

    } else if (name === 'Submit Changes') {
      this.props.setMentorModal(null)
      this.props.updateChangedMentor(currentMentor);
      this.props.openEditMentor(false)
      this.setState({ currentMentor: {} })

    } else if (name === 'Exit') {
      this.props.setMentorModal(null)
      this.props.openEditMentor(false)
      this.setState({ currentMentor: {} })
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    
    this.setState({ [name]: value });
  }

  getStudent = (students) => {
    const student = students.filter(student => {
      return student.name === this.state.menteeToAssign;
    })
    return student[0];
  }

  assignMentee = async () => {
    const { makeStudentInactive, modalInfo, students, token } = this.props;
    const student = this.getStudent(students);
    const mentorId = modalInfo.id;
    let mentorToChange = this.props.currentMentor
    let numToChange = this.props.currentMentor.mentee_capacity - 1
    
    mentorToChange = Object.assign({...mentorToChange}, { mentee_capacity: numToChange })
    console.log(mentorToChange)
    await patchMentor(mentorToChange, token)
    await this.props.updateChangedMentor(mentorToChange)
    await this.props.setMentorModal(mentorToChange)
    await postRelationship(student.id, mentorId, token);
    await makeStudentInactive(student.id);
    await patchStudent(student, token)
    await this.props.retrieveRelationships(token)
    this.setState({ mentees: this.getMentees() })
  }

  getMenteeIcons = (capacity) => {
    let capacityIcons = [];

    for(let i = 0; i < capacity; i++) {
      capacityIcons.push(
        <img 
          key={i} 
          className='amm-capacity-icon' 
          src={require('../../utils/assets/capacity.svg')} 
          alt='capacity icon'
        />
      )
    }
    return capacityIcons;
  }

  getList = (items) => {
    return items.map(item => {
      return (
        <div className='amm-list-item-container' key={item}>
          <img 
            className='amm-dash-icon' 
            src={require('../../utils/assets/right-arrow.svg')}
            alt='dash icon'
          />
          <p className='amm-list-item'>{item}</p>
        </div>
      )
    })
  }

  getPreferencesIcons = (preferences) => {
    let prefIconArr = preferences.map(preference => {
      let newPreference;
      let prefIcon;
      if (preference !== 'no preference') {
        newPreference = preference.toLowerCase();
        if (newPreference === 'lgbtq+') {
          newPreference = newPreference.slice(0, -1)
        };
      
      prefIcon = <img 
            className='amc-pref-icon' 
            src={require(`../../utils/assets/${newPreference}.svg`)} 
            alt={`${newPreference} preference indicator`} 
            key={`${newPreference}`}
            title={`${newPreference}`}
          />
        }
        return prefIcon;
    })
    return prefIconArr;
  }

  getStudentOptions = () => {
    return this.props.students.map((student, index) => {
      let studentOption;
      if (student.active && !student.matched) {
        studentOption = <option key={index} value={student.name}>{student.name}</option>
      }
      return studentOption
    })
  }

  getMentees = () => {
    const { modalInfo, relationships, students, addModalMentees } = this.props;
    const mentorId = modalInfo.id;
    const matchedRelationships = relationships.filter(relationship => relationship.attributes.mentor_id === mentorId && relationship.attributes.active );
    const menteeIds = matchedRelationships.map(relationship => relationship.attributes.student_id);
    const mentees = [];
    menteeIds.forEach(id => {
      students.forEach(student => {
        if (student.id === id) {
          mentees.push(student)
        }
      })
    })
    addModalMentees({...modalInfo, mentees: mentees});
    return mentees.map((mentee, index) => {
      let relationshipId = matchedRelationships.filter(relationship => relationship.attributes.student_id === mentee.id)
      return (
        <div className='amm-list-item-container amm-mentees' key={relationshipId[0].id + index}>
          <div className='amm-dash-list'>
            <img 
              className='amm-dash-icon' 
              src={require('../../utils/assets/right-arrow.svg')}
              alt='dash icon'
            />
            <p className='amm-list-item'>{mentee.name}</p>
          </div>
          <button
            name={relationshipId[0].id}
            onClick={(event) => this.unmatch(event, mentee.id)}
          >Unmatch</button>
        </div>
      )
    })
  }

  unmatch = async (event, studentId) => {
    const mentorId = this.props.modalInfo.id;
    const relationshipId = event.target.name;
    let mentorToChange = this.props.currentMentor
    let numToChange = this.props.currentMentor.mentee_capacity + 1
    let { token } = this.props
    
    mentorToChange = Object.assign({...mentorToChange}, { mentee_capacity: numToChange })

    await patchMentor(mentorToChange, token)
    await this.props.updateChangedMentor(mentorToChange)
    await this.props.setMentorModal(mentorToChange)
    await patchRelationship(studentId, mentorId, relationshipId, token);
    await this.props.retrieveRelationships(token)
    await this.setState({ mentees: this.getMentees() })
  }

  render() {
    let { isEditable } = this.props;
    
    if(this.props.modalInfo && !isEditable) {
      let studentOptions = this.getStudentOptions();
      let mentees = this.state.mentees;
      let { menteeToAssign } = this.state
      let { 
        name,
        email,
        city,
        state,
        country,
        slack_username,
        matched,
        // active,
        pronouns,
        current_title,
        current_employer,
        background,
        industries,
        ways_to_mentor,
        expertise_tech,
        expertise_non_tech,
        mentee_capacity,
        meeting_location,
        identity_preference
      } = this.props.modalInfo;

      return (
        <div className='amm-modal-show'>
          <div>
            <div className='amm-basic-info'>
              <img
                className='amm-pic'
                src={require('../../utils/assets/amm-pic.svg')}
                alt='Mentor profile'
              />
              <div className='amm-header-info'>
                <div className='amm-top-line'>
                  <h1 className='amm-name'>{name}</h1>
                  <img 
                    className='amm-x'
                    alt='Click here to exit'
                    name='Exit' 
                    onClick={this.handleClick} 
                    src={require('../../utils/assets/x.svg')}/>
                </div>
                <p className='amm-job'>{current_title} @ {current_employer}</p>
                <div className='amm-bottom-line'>
                  <div className='amm-location-container'>
                      <img 
                        className='amm-matched'
                        src={require(`../../utils/assets/matched-${matched}.svg`)}
                        alt={`Matched = ${matched}`} />
                      <p className='amm-location'>{city}, {state}, {country}</p>
                    </div>
                    <p className='amm-pronoun'>{`(${pronouns})`}</p>
                </div>
              </div>
            </div>

            <div className='amm-assign-student'>
              <div className='amm-bio'>
                <h3>Bio</h3>
                <p>{background}</p>
              </div>
              <div>
                <h3>Current Mentees</h3>
                { mentees }

              </div>
              <div className='amm-match-dropdown-container'>
                <h3>Match</h3>
                <select 
                  name='menteeToAssign'
                  onChange={this.handleChange} 
                  className='amm-match-dropdown'
                >
                  <option value=''>Select a Student</option>
                  { studentOptions }
                </select>
                <button
                  className='amm-assign-btn' 
                  onClick={this.assignMentee}
                  disabled={!mentee_capacity || !menteeToAssign} 
                >Assign</button>
              </div>
            </div>

            <div className='amm-card-container'>
              <div className='amm-card amm-contact'>
                <h3 className='amm-contact-title'>Contact</h3>
                  <div className='amm-flex'>
                    <h4>Email:</h4>
                    <p className='amm-email'>{email}</p>
                  </div>
                  <div className='amm-flex'>
                    <h4>Slack:</h4>
                    <p className='amm-slack'>{slack_username}</p>
                  </div>
              </div>

              <div className='amm-card'>
                <h3>Industry Knowlegde</h3>
                {this.getList(industries)}
              </div>

              <div className='amm-card'>
                <h3>How I Can Help</h3>
                {this.getList(ways_to_mentor)}
              </div>
              
              <div className='amm-card'>
                <h3>Tech Expertise</h3>
                {this.getList(expertise_tech)}
              </div>

              <div className='amm-card'>
                <h3>Non-Tech Expertise</h3>
                {this.getList(expertise_non_tech)}
              </div>
              <div className='amm-card'>
                <h3>Capacity</h3>
                {this.getMenteeIcons(mentee_capacity)}
              </div>

              <div className='amm-card'>
                <h3>Meeting Location</h3>
                {this.getList(meeting_location)}
              </div>

              <div className='amm-card'>
                <h3>Mentee Preferences</h3>
                {this.getPreferencesIcons(identity_preference)}
              </div>
            </div>
          </div>
          <div>
            <button 
              className='amm-edit-btn' 
              name='Edit' 
              onClick={this.handleClick}>
              Edit
            </button>
          </div>
        </div>
      )
    } else if (this.props.modalInfo && isEditable) {
      return (
        <EditableMentor currentMentor={this.state.currentMentor}/>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  modalInfo: state.modalInfo,
  mentors: state.mentors,
  isEditable: state.isEditable,
  students: state.students,
  relationships: state.relationships,
  token: state.token
});

export const mapDispatchToProps = (dispatch) => ({
  setMentorModal: mentor => dispatch(setMentorModal(mentor)),
  updateChangedMentor: mentor => dispatch(updateChangedMentor(mentor)),
  openEditMentor: bool => dispatch(isEditable(bool)),
  makeStudentInactive: studentId => dispatch(makeStudentInactive(studentId)),
  addModalMentees: mentees => dispatch(addModalMentees(mentees)),
  retrieveRelationships: (token) => dispatch(retrieveRelationships(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminMentorModal));