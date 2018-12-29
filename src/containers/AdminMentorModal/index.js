import React, { Component } from 'react';
import './AdminMentorModal.css';
import { connect } from 'react-redux';
import { setMentorModal, updateChangedMentor } from '../../actions/mentor-actions';
// import { patchMentor } from '../../utils/api';

export class AdminMentorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: false,
      currentMentor: {}
    }
  }

  handleClick = (event) => {
    let { name } = event.target
    let { currentMentor } = this.state;
    
    if (name === 'Edit') {
      let mentorObj = Object.assign({}, this.props.modalInfo)

      this.setState({ isEditable: true, currentMentor: mentorObj })

    } else if (name === 'Submit Changes') {
      this.props.setMentorModal(null)
      this.props.updateChangedMentor(currentMentor);
      // patchMentor(currentMentor)
      
      this.setState({ isEditable: false, currentMentor: {} })

    } else if (name === 'Exit') {
      this.props.setMentorModal(null)
      this.setState({ isEditable: false, currentMentor: {} })
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let mentorObj = Object.assign({}, this.state.currentMentor);
    
    mentorObj[name] = value;
    this.setState({ currentMentor: mentorObj });
  }

  render() {
    let { isEditable } = this.state

    if(this.props.modalInfo && !isEditable) {
      let { 
        name,
        email,
        city,
        state,
        country,
        slack_username,
        matched,
        active,
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
        preferences
      } = this.props.modalInfo;
      return (
        <div className='amm-modal-show'>
          <h1>{name}</h1>
          <p>{email}</p>
          <p>{city}</p>
          <p>{state}</p>
          <p>{country}</p>
          <p>{slack_username}</p>
          <p>{matched}</p>
          <p>{active}</p>
          <p>{pronouns}</p>
          <p>{current_title}</p>
          <p>{current_employer}</p>
          <p>{background}</p>
{ /*      <p>{industries}</p>
          <p>{ways_to_mentor}</p>
          <p>{expertise_tech}</p>
          <p>{expertise_non_tech}</p>
          <p>{mentee_capacity}</p>
          <p>{meeting_location}</p>
          <p>{preferences}</p>*/}
          <button name='Edit' onClick={this.handleClick}>Edit</button>
          <button name='Exit' onClick={this.handleClick}>X</button>
        </div>
      )
    } else if (this.props.modalInfo && isEditable) {
        let { currentMentor } = this.state;
        let { 
            name,
            email,
            city,
            state,
            country,
            slack_username,
            matched,
            active,
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
            preferences
          } = this.props.modalInfo;
          return (
            <div className='amm-modal-show'>
              <input name='name' value={currentMentor.name} onChange={this.handleChange} />
              <input name='email' value={currentMentor.email} onChange={this.handleChange} />
              <input name='city' value={currentMentor.city} onChange={this.handleChange} />
              <input name='state' value={currentMentor.state} onChange={this.handleChange} />
              <input name='country' value={currentMentor.country} onChange={this.handleChange} />
              <input name='slack_username' value={currentMentor.slack_username} onChange={this.handleChange} />
              <input name='matched' value={currentMentor.matched} onChange={this.handleChange} />
              <input name='active' value={currentMentor.active} onChange={this.handleChange} />
              <input name='pronouns' value={currentMentor.pronouns} onChange={this.handleChange} />
              <input name='current_title' value={currentMentor.current_title} onChange={this.handleChange} />
              <input name='current_employer' value={currentMentor.current_employer} onChange={this.handleChange} />
              <input name='background' value={currentMentor.background} onChange={this.handleChange} />
    { /*      <p>{industries}</p>
              <p>{ways_to_mentor}</p>
              <p>{expertise_tech}</p>
              <p>{expertise_non_tech}</p>
              <p>{mentee_capacity}</p>
              <p>{meeting_location}</p>
              <p>{preferences}</p>*/}
              <button name='Submit Changes' onClick={this.handleClick}>Submit Changes</button>
              <button name='Exit' onClick={this.handleClick}>X</button>
            </div>
          )
    } else {
      return (
        <div className='amm-modal-hide'></div>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  modalInfo: state.modalInfo,
  mentors: state.mentors
});

export const mapDispatchToProps = (dispatch) => ({
  setMentorModal: mentor => dispatch(setMentorModal(mentor)),
  updateChangedMentor: mentor => dispatch(updateChangedMentor(mentor))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMentorModal);