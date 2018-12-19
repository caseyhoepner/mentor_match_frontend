import React, { Component } from 'react';
import './MentorContainer.css';

class MentorContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <header className='mc-header'>
          <div className='mc-nav-btns'>
            <img src={require('../../utils/assets/turing-logo.png')} alt='Turing Logo' className='mc-turing-logo' />
            <div className='mc-github-btn'>
              <p className='mc-gh-tagline'>Sign in with GitHub</p>
              <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='mc-github-logo' />
            </div>
          </div>
          <div className='mc-title'>
            <h1>Mentor Profiles</h1>
            <div className='mc-line-break'></div>
            <p className='mc-tagline'>Browse current mentors to find your match!</p>
          </div>
        </header>
      </div>
      )
  }
}

export default MentorContainer;