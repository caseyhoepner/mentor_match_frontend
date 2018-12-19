import React, { Component } from 'react';
import './MentorContainer.css';

class MentorContainer extends Component {
  constructor() {
    super();

    this.state = {
      localeSelected: '',
      search: ''
    }
  }

  handleChange = (event) => {
    let { value, name } = event.target

    this.setState({ [name]: value })
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
        <div className='mc-search-container'>
          <div className='mc-search-bar'>
            <input 
              name='search' 
              type='text' 
              value={this.state.search} 
              onChange={this.handleChange} 
              placeholder='Search here...'
              className='mc-search-input'
            />
            <div className='mc-search-icon'>
            </div>
          </div>
          <select
            value={this.state.localeSelected}
            onChange={this.handleChange}
            name='localeSelected'
            className='mc-location-dropdown'
          >
            <option value=''>--Select locale--</option>
            <option value='Denver'>Denver</option>
            <option value='Remote'>Remote</option>
            <option></option>
          </select> 
        </div>
      </div>
      )
  }
}

export default MentorContainer;