import React, { Component } from 'react';
import './MentorContainer.css';
import Search from '../../containers/Search';

class MentorContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header className='mc-header'>
          <div className='mc-nav-btns'>
            <img src={require('../../utils/assets/turing-logo.png')} alt='Turing Logo' className='mc-turing-logo' />
            <div className='mc-github-btn'>
              <a href='https://github.com/login/oauth/authorize?client_id=81ef33f7e5b1e21f0162&scope=repo' className='mc-gh-tagline'>Sign in with GitHub</a>
              <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='mc-github-logo' />
            </div>
          </div>
          <div className='mc-title'>
            <h1 className='mc-title-text'>Mentor Profiles</h1>
            <div className='mc-line-break'></div>
            <p className='mc-tagline'>Browse current mentors to find your match!</p>
          </div>
        </header>
        <Search />
      </div>
    )
  }
}

export default MentorContainer;