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
          <img src={require('../../utils/assets/turing-logo.png')} alt='Turing Logo' />
        </header>
      </div>
      )
  }
}

export default MentorContainer;