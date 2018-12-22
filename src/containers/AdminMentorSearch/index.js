import React, { Component } from 'react';
import Preferences from '../../containers/Preferences';
import hollowHeart from '../../utils/assets/heart.svg';
import solidHeart from '../../utils/assets/solid-heart.svg';
import { connect } from 'react-redux';
import { setLocale, setSearch } from '../../actions/search-actions';
import './AdminMentorSearch.css';

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
    const { value, name } = event.target;
    const { setLocale, setSearch } = this.props; 
    
    this.setState({ [name]: value })

    if(name === 'localeSelected') {
      setLocale(value)
    } else if (name === 'search') {
      setSearch(value)
    }
  }

  toggleClicked = (event) => {
    const { name } = event.target;

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
        <div className='ams-search-container'>
          <div className='ams-search-inputs-container'>
            <div className='ams-search-bar'>
              <input 
                name='search' 
                type='text' 
                value={search} 
                onChange={this.handleChange} 
                placeholder='Search here...'
                className='ams-search-input'
              />
              <div className='ams-search-icon'>
              </div>
            </div>
            <select
              value={localeSelected}
              onChange={this.handleChange}
              name='localeSelected'
              className='ams-location-dropdown'
            >
              <option value=''>--Select locale--</option>
              <option value='Denver'>Denver</option>
              <option value='Remote'>Remote</option>
              <option></option>
            </select>
            </div>
          <div className='ams-filter-btn-container'>
            <button 
              className={!preferencesClicked ? 'ams-filter-btn' : 'ams-filter-btn active'}
              onClick={this.toggleClicked}
              name='preferencesClicked'
            >
              Filter by Preferences
            </button>
            <button 
              className={!allMentorsClicked ? 'ams-filter-btn' : 'ams-filter-btn active'}
              onClick={this.toggleClicked}
              name='allMentorsClicked'
            >
              All Mentors
            </button>
          </div>
        </div>
        <Preferences preferencesClicked={preferencesClicked}/>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  locale: state.locale
})

export const mapDispatchToProps = (dispatch) => ({
    setLocale: locale => dispatch(setLocale(locale)),
    setSearch: searchTerm => dispatch(setSearch(searchTerm))
})

export default connect(mapDispatchToProps, mapDispatchToProps)(Search);