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
    const { name, preferences } = this.props.mentor;
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
        <div className='amc-record-item amc-view-edit' onClick={this.handleClick}>
          <img className='amc-pref-icon' src={require('../../utils/assets/eye.svg')} alt='Click to View or Edit Mentor' />
          <h1 className='amc-slash'>/</h1>
          <img className='amc-pref-icon' src={require('../../utils/assets/pencil.svg')} alt='Click to View or Edit Mentor' />
        </div>
      </div>
      )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setMentorModal: mentor => dispatch(setMentorModal(mentor))
})

export default connect(null, mapDispatchToProps)(AdminMentorCard);