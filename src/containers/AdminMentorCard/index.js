import React, { Component } from 'react';
import './AdminMentorCard.css';
import { connect } from 'react-redux';
import { setMentorModal } from '../../actions/mentor-actions';

export class AdminMentorCard extends Component {
  constructor(props) {
    super(props);
}

  handleClick = () => {
    let { setMentorModal, mentor } = this.props;

    setMentorModal(mentor)
  }

  render() {
    const { name, identity_preference } = this.props.mentor;
    const preferencesIcons = identity_preference.map(preference => {
      if (preference === 'female' ||
          preference === 'lgbtq' || 
          preference === 'male' || 
          preference === 'parent' || 
          preference === 'veteran') {
      return <img 
              className='amc-pref-icon' 
              src={require(`../../utils/assets/${preference}.svg`)} 
              alt={`${preference} preference indicator`} 
              key={`${preference}`}/>
      } else return;
    })

    return (
      <div className='amc-card'>
        <div className='amc-pic-name-container amc-record-item'>
          <img 
            className='amc-mentor-pic'
            src={require('../../utils/assets/mentor-pic-default.svg')}
            />
          <p className='amc-record-item'>{name}</p>
        </div>


        <div className='amc-pref-view-container'>
          <div className='amc-record-item'>
          { preferencesIcons }
          </div>
          <div className='amc-record-item amc-view-edit' onClick={this.handleClick}>
            <img className='amc-pref-icon' src={require('../../utils/assets/eye.svg')} alt='Click to View or Edit Mentor' />
            <p className='amc-slash'>/</p>
            <img className='amc-pref-icon' src={require('../../utils/assets/pencil.svg')} alt='Click to View or Edit Mentor' />
          </div>
        </div>
      </div>
      )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setMentorModal: mentor => dispatch(setMentorModal(mentor))
})

export default connect(null, mapDispatchToProps)(AdminMentorCard);