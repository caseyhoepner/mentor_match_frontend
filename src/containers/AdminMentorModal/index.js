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
        <div className='amm-list-item-container'>
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
    return preferences.map(preference => {
      if (preference !== 'no preference') {
        return (
          <img 
            className='amc-pref-icon' 
            src={require(`../../utils/assets/${preference}.svg`)} 
            alt={`${preference} preference indicator`} 
            key={`${preference}`}
            title={`${preference}`}
          />
        )
      }
    })
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
        identity_preference
      } = this.props.modalInfo;

      return (
        <div className='amm-modal-show'>
          <div className='amm-basic-info'>
            <img
              className='amm-pic'
              src={require('../../utils/assets/amm-pic.svg')}
              alt='Mentor picture'
            />
            <div className='amm-header-info'>
              <div className='amm-top-line'>
                <h1 className='amm-name'>{name}</h1>
                <img 
                  className='amm-x'
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


            <div className='amm-bio'>
                <h3>Bio</h3>
                <p>{background}</p>
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
              <p>{this.getList(industries)}</p>
            </div>

            <div className='amm-card'>
              <h3>How I Can Help</h3>
              <p>{this.getList(ways_to_mentor)}</p>
            </div>
            
            <div className='amm-card'>
              <h3>Tech Expertise</h3>
              <p>{this.getList(expertise_tech)}</p>
            </div>

            <div className='amm-card'>
              <h3>Non-Tech Expertise</h3>
              <p>{this.getList(expertise_non_tech)}</p>
            </div>
            <div className='amm-card'>
              <h3>Capacity</h3>
              <p>{this.getMenteeIcons(mentee_capacity)}</p>
            </div>

            <div className='amm-card'>
              <h3>Meeting Location</h3>
              <p>{meeting_location}</p>
            </div>

            <div className='amm-card'>
              <h3>Mentee Preferences</h3>
              <p>{this.getPreferencesIcons(identity_preference)}</p>
            </div>
          </div>
          
          <button 
            className='amm-edit-btn' 
            name='Edit' 
            onClick={this.handleClick}>
            Edit
          </button>
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
            identity_preference
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
              <p>{industries}</p>
              <p>{ways_to_mentor}</p>
              <p>{expertise_tech}</p>
              <p>{expertise_non_tech}</p>
              <p>{mentee_capacity}</p>
              <p>{meeting_location}</p>
              <p>{identity_preference}</p>
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