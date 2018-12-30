import React, { Component } from 'react';
import './AdminMentorCard.css';
import { connect } from 'react-redux';
import { setMentorModal } from '../../actions/mentor-actions';

export class AdminMentorCard extends Component {
  constructor(props) {
    super(props);
}

  handleClick = () => {
    const { setMentorModal, mentor } = this.props;

    setMentorModal(mentor)
  }

  render() {
    const { name, identity_preference, matched } = this.props.mentor;
    const preferencesIcons = identity_preference.map(preference => {
      let newPreference = preference.toLowerCase();
      if (newPreference === 'lgbtq+') {
        newPreference = newPreference.slice(0, -1)
      }
      if (newPreference !== 'no preference') {
      return <img 
              className='amc-pref-icon' 
              src={require(`../../utils/assets/${newPreference}.svg`)} 
              alt={`${newPreference} preference indicator`} 
              key={`${newPreference}`}
              title={`${newPreference}`} />
      }
    })

    return (
      <div className='amc-card' onClick={this.handleClick}>
        <div className='amc-pic-name-container amc-record-item'>
          <img 
            className='amc-mentor-pic'
            src={require('../../utils/assets/mentor-pic-default.svg')}
            />
          <p className='amc-record-item'>{name}</p>
        </div>
        <div className='amc-record-item amc-pref'>
          { preferencesIcons }
        </div>
        <div className='amc-record-item amc-matched'>
          <img 
            className='amc-matched-icon'
            src={require(`../../utils/assets/matched-${matched}.svg`)} />
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setMentorModal: mentor => dispatch(setMentorModal(mentor))
})

export default connect(null, mapDispatchToProps)(AdminMentorCard);