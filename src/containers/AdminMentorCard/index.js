import React, { Component } from 'react';
import './AdminMentorCard.css';
import { connect } from 'react-redux';
import { setMentorModal } from '../../actions/mentor-actions';

export class AdminMentorCard extends Component {

  handleClick = () => {
    const { setMentorModal, mentor } = this.props;

    setMentorModal(mentor)
  }

  getPrefIcons = () => {
    const { identity_preference } = this.props.mentor;
    const preferencesIcons = identity_preference.map(preference => {
      let newPreference = preference.toLowerCase();
      let prefImage;
      if (newPreference === 'lgbtq+') {
        newPreference = newPreference.slice(0, -1)
      }
      if (newPreference !== 'no preference') {
      prefImage = <img 
              className='amc-pref-icon' 
              src={require(`../../utils/assets/${newPreference}.svg`)} 
              alt={`${newPreference} preference indicator`} 
              key={`${newPreference}`}
              title={`${newPreference}`} />
      }
      return prefImage
    })
    return preferencesIcons
  }

  render() {
    const { name, identity_preference, stack_preference, matched } = this.props.mentor;
    const preferencesIcons = this.getPrefIcons();

    return (
      <div className='amc-card' onClick={this.handleClick}>
          <img 
            className='amc-mentor-pic'
            alt='default profile'
            src={require('../../utils/assets/mentor-pic-default.svg')}
            />
          <p className='amc-name'>{name}</p>
          <p className='amc-stack'>{stack_preference}</p>
        <div className='amc-prefs'>
          { preferencesIcons }
        </div>
        <div className='amc-matched'>
          <img 
            className='amc-matched-icon'
            alt='matched indicator'
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