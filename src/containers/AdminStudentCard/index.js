import React, { Component } from 'react';
import './AdminStudentCard.css';

export class AdminStudentCard extends Component {

  getPrefIcons = (identities) => {
    const identityIcons = identities.map(identity => {
      let newIdentity = identity.toLowerCase();

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
      return newIdentity;
    })
    return identityIcons;
  }

  render() {
    const { name, identity_marker, stack, matched } = this.props.student;
    const identityIcons = this.getPrefIcons(identity_marker);

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

export default AdminStudentCard;