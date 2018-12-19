import React, { Component } from 'react';
import './MentorContainer.css';
import hollowHeart from '../../utils/assets/heart.svg';
import solidHeart from '../../utils/assets/solid-heart.svg';

class MentorContainer extends Component {
  constructor() {
    super();

    this.state = {
      localeSelected: '',
      search: '',
      favClicked: false
    }
  }

  handleChange = (event) => {
    let { value, name } = event.target

    this.setState({ [name]: value })
  }

  toggleFavorite = (event) => {
    let { favClicked } = this.state

    this.setState({ favClicked: !favClicked })
    
  }

  render() {
    let { favClicked, localeSelected, search } = this.state

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
          <div className='mc-search-inputs-container'>
            <div className='mc-search-bar'>
              <input 
                name='search' 
                type='text' 
                value={search} 
                onChange={this.handleChange} 
                placeholder='Search here...'
                className='mc-search-input'
              />
              <div className='mc-search-icon'>
              </div>
            </div>
            <select
              value={localeSelected}
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
          <div className='mc-filter-btn-container'>
            <button className='mc-filter-btn'>Filter by Preferences</button>
            <button className='mc-filter-btn'>All Mentors</button>
            <img
              src={!favClicked ? hollowHeart : solidHeart}
              alt='favorite button'
              className={!favClicked ? 'mc-favorite-btn' : 'mc-favorite-btn selected'}
              onClick={this.toggleFavorite}
            />
          </div>
        </div>
      </div>
      )
  }
}

export default MentorContainer;