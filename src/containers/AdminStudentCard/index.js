import React, { Component } from 'react';
import './AdminStudentCard.css';
import { connect } from 'react-redux';
// import { setMentorModal } from '../../actions/mentor-actions';

export class AdminStudentCard extends Component {
//   constructor(props) {
//     super(props);
// }

  getPrefIcons = (identities) => {
    const identityIcons = identities.map(identity => {
      let newIdentity = identity.toLowerCase();
      // let identityIcon;

      if (newIdentity === 'lgbtq+') {
        newIdentity = newIdentity.slice(0, -1)
      }
      if (newIdentity !== 'no preference') {
      newIdentity = <img 
              className='asc-pref-icon' 
              src={require(`../../utils/assets/${newIdentity}.svg`)} 
              alt={`${newIdentity} preference indicator`} 
              key={`${newIdentity}`}
              title={`${newIdentity}`} />
      }
      return newIdentity
    })
    return identityIcons
  }

  render() {
    const { name, identities, stack, matched } = this.props.student;
    const identityIcons = this.getPrefIcons(identities);

    return (
      <div className='asc-card'>
        <p className='asc-name'>{name}</p>
        <p className='asc-stack'>{stack}</p>
        <div className='asc-prefs'>
          { identityIcons }
        </div>        <div className='asc-matched'>
          <img 
            className='asc-matched-icon'
            alt='matched indicator'
            src={require(`../../utils/assets/matched-${matched}.svg`)} />
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(AdminStudentCard);