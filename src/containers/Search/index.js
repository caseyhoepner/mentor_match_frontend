import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {
  constructor() {
    super();
  }

  render() {
    return (
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
          <button 
            className={preferencesClicked ? 'mc-filter-btn' : 'mc-filter-btn active'}
            onClick={this.toggleClicked}
            name='preferencesClicked'
          >
            Filter by Preferences
          </button>
          <button 
            className={!allMentorsClicked ? 'mc-filter-btn' : 'mc-filter-btn active'}
            onClick={this.toggleClicked}
            name='allMentorsClicked'
          >
            All Mentors
          </button>
          <img
            src={!favClicked ? hollowHeart : solidHeart}
            alt='favorite button'
            className={!favClicked ? 'mc-favorite-btn' : 'mc-favorite-btn selected'}
            onClick={this.toggleClicked}
            name='favClicked'
          />
        </div>
      </div>
    )
  }
}

export default Search;