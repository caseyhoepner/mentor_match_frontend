import React, { Component } from 'react';
import './MentorContainer.css';
import hollowHeart from '../../utils/assets/heart.svg';
import solidHeart from '../../utils/assets/solid-heart.svg';
import Switch from 'react-toggle-switch';

class MentorContainer extends Component {
  constructor() {
    super();

    this.state = {
      localeSelected: '',
      search: '',
      favClicked: false,
      allMentorsClicked: false,
      preferencesClicked: false,
      veteranSwitched: false,
      parentSwitched: false,
      lgbtqiaSwitched: false,
      showPreferences: false
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

  toggleVeteran = (event) => {
    let { veteranSwitched } = this.state;

    this.setState({ veteranSwitched: !veteranSwitched })
  }

  toggleParent = (event) => {
    let { parentSwitched } = this.state;

    this.setState({ parentSwitched: !parentSwitched })
  }

  toggleLGBTQIA = (event) => {
    let { lgbtqiaSwitched } = this.state;

    this.setState({ lgbtqiaSwitched: !lgbtqiaSwitched })
  }
  toggleMale = (event) => {
    let { maleSwitched } = this.state;

    this.setState({ maleSwitched: !maleSwitched })
  }

  toggleFemale = (event) => {
    let { femaleSwitched } = this.state;

    this.setState({ femaleSwitched: !femaleSwitched })
  }

  toggleNonBinary = (event) => {
    let { nonBinarySwitched } = this.state;

    this.setState({ nonBinarySwitched: !nonBinarySwitched })
  }


  render() {
    let { favClicked, localeSelected, search, allMentorsClicked, preferencesClicked, switched, veteranSwitched, parentSwitched, lgbtqiaSwitched, showPreferences, maleSwitched, femaleSwitched, nonBinarySwitched } = this.state

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
            <h1 className='mc-title-text'>Mentor Profiles</h1>
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
        <div className={!showPreferences ? 'mc-preferences-container' : 'hide'}>
          <div className='mc-toggle-option'>
            <p>Veteran</p>
              <Switch 
                onClick={this.toggleVeteran} 
                on={veteranSwitched}
                name='veteranSwitched'
              />
          </div>
          <div className='mc-toggle-option'>
            <p>Parent</p>
              <Switch 
                onClick={this.toggleParent} 
                on={parentSwitched}
                name='parentSwitched'
              />
          </div>
          <div className='mc-toggle-option'>
            <p>LGBTQIA+</p>
              <Switch 
                onClick={this.toggleLGBTQIA} 
                on={lgbtqiaSwitched} 
                name='lgbtqiaSwitched'
              />
          </div>          
          <div className='mc-toggle-option'>
            <p>Male-Identifying</p>
              <Switch 
                onClick={this.toggleMale} 
                on={maleSwitched} 
                name='maleSwitched'
              />
          </div>          
          <div className='mc-toggle-option'>
            <p>Female-Identifying</p>
              <Switch 
                onClick={this.toggleFemale} 
                on={femaleSwitched} 
                name='femaleSwitched'
              />
          </div>          
          <div className='mc-toggle-option'>
            <p>Non-Binary</p>
              <Switch 
                onClick={this.toggleNonBinary} 
                on={nonBinarySwitched} 
                name='nonBinarySwitched'
              />
          </div>
        </div>
      </div>
      )
  }
}

export default MentorContainer;