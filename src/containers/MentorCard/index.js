import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './MentorCard.css';

export class MentorCard extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { name, current_title, background } = this.props.mentor.props.mentor;

    return (
      <div className='mcard-container'>
        <img 
          className='mcard-pic'
          src={require('../../utils/assets/mentor-pic-default.svg')} 
          alt='Default profile'/>
        <h2>{name}</h2>
        <p>{current_title}</p>
        <p>{background}</p>
      </div>
    )
  }
}

export default MentorCard;