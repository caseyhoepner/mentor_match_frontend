import React, { Component } from 'react';
import './AdminMentorModal.css';
import { connect } from 'react-redux';

export class AdminMentorModal extends Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.modalInfo) {
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
          <button>Edit</button>
          <button>X</button>
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
  modalInfo: state.modalInfo
});

export const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMentorModal);