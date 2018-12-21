import React, { Component } from 'react';
import './Search.css';
import Preferences from '../../containers/Preferences';
import hollowHeart from '../../utils/assets/heart.svg';
import solidHeart from '../../utils/assets/solid-heart.svg';

export class Search extends Component {
  constructor() {
    super();

    this.state = {
      localeSelected: '',
      search: '',
      favClicked: false,
      allMentorsClicked: false,
      preferencesClicked: false
    }
  }

  handleChange = (event) => {
    let { value, name } = event.target;

    this.setState({ [name]: value })
  }

  toggleClicked = (event) => {
    let { name } = event.target;

    if (name === 'preferencesClicked') {
      this.setState({
        showPreferences: !this.state.showPreferences
      }) 
    }

    this.setState({ [name]: !this.state[name] })
  }

  render() {
    const {search, localeSelected, preferencesClicked, allMentorsClicked, favClicked } = this.state;

    return (
      <div>
        <div className='s-search-container'>
          <div className='s-search-inputs-container'>
            <div className='s-search-bar'>
              <input 
                name='search' 
                type='text' 
                value={search} 
                onChange={this.handleChange} 
                placeholder='Search here...'
                className='s-search-input'
              />
              <div className='s-search-icon'>
              </div>
            </div>
            <select
              value={localeSelected}
              onChange={this.handleChange}
              name='localeSelected'
              className='s-location-dropdown'
            >
              <option value=''>--Select locale--</option>
              <option value='Denver'>Denver</option>
              <option value='Remote'>Remote</option>
              <option></option>
            </select>
            </div>
          <div className='s-filter-btn-container'>
            <button 
              className={!preferencesClicked ? 's-filter-btn' : 's-filter-btn active'}
              onClick={this.toggleClicked}
              name='preferencesClicked'
            >
              Filter by Preferences
            </button>
            <button 
              className={!allMentorsClicked ? 's-filter-btn' : 's-filter-btn active'}
              onClick={this.toggleClicked}
              name='allMentorsClicked'
            >
              All Mentors
            </button>
            <img
              src={!favClicked ? hollowHeart : solidHeart}
              alt='favorite button'
              className={!favClicked ? 's-favorite-btn' : 's-favorite-btn selected'}
              onClick={this.toggleClicked}
              name='favClicked'
            />
          </div>
        </div>
        <Preferences preferencesClicked={preferencesClicked}/>
      </div>
    )
  }
}

export default Search;