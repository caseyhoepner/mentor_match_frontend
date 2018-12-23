import React, { Component } from 'react';
import './AdminMentorCard.css';

export class AdminMentorCard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='amc-card'>
        <h1 className='amc-record-item'>PICTURE!!</h1>
        <h1 className='amc-record-item'>GodCaseyJesus</h1>
        <h1 className='amc-record-item'>Front-End</h1>
        <div className='amc-record-item'>
          <img className='amc-pref-icon' src={require('../../utils/assets/veteran.svg')} alt='veteran preference indicator' />
          <img className='amc-pref-icon' src={require('../../utils/assets/parent.svg')} alt='parent preference indicator' />
          <img className='amc-pref-icon' src={require('../../utils/assets/lgbtq.svg')} alt='lgbtq preference indicator' />
          <img className='amc-pref-icon' src={require('../../utils/assets/female.svg')} alt='female preference indicator' />
          <img className='amc-pref-icon' src={require('../../utils/assets/male.svg')} alt='male preference indicator' />
        </div>
        <div className='amc-record-item amc-view-edit'>
          <img className='amc-pref-icon' src={require('../../utils/assets/eye.svg')} alt='Click to View or Edit Mentor' />
          <h1 className='amc-slash'>/</h1>
          <img className='amc-pref-icon' src={require('../../utils/assets/pencil.svg')} alt='Click to View or Edit Mentor' />
        </div>
      </div>
      )
  }
}

export default AdminMentorCard;