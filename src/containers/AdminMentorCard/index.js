import React, { Component } from 'react';
import './AdminMentorCard.css';

export class AdminMentorCard extends Component {
  constructor(props) {
    super(props)
}

  render() {
    const { name, preferences, active } = this.props.mentor;
    // const preferencesIcons = preferences.map(preference => {
    //   <img className='amc-pref-icon' src={require(`../../utils/assets/${preference}.svg`)} alt=`${preference} preference indicator` />
    // })
    return (
      <div className='amc-card'>
        <h1 className='amc-record-item'>PICTURE!!</h1>
        <h1 className='amc-record-item'>{name}</h1>
        <h1 className='amc-record-item'>{preferences.title}</h1>
        <div className='amc-record-item'>
        { /* preferencesIcons */ }
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