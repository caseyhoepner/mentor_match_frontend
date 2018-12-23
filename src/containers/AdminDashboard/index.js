import React, { Component } from 'react';
import './AdminDashboard.css';
import AdminMentorSearch from '../../containers/AdminMentorSearch';
import AdminMentorCard from '../AdminMentorCard';

export class AdminDashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header className='ad-header'>
          <div className='ad-nav-btns'>
            <img src={require('../../utils/assets/turing-logo.png')} alt='Turing Logo' className='ad-turing-logo' />
            <div className='ad-github-btn'>
              <p className='ad-gh-tagline'>Sign in with GitHub</p>
              <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='ad-github-logo' />
            </div>
          </div>
          <div className='ad-title'>
            <h1 className='ad-title-text'>Admin Dashboard</h1>
            <div className='ad-line-break'></div>
            <p className='ad-tagline'>Filter mentors and students to find a match!</p>
          </div>
        </header>
        <AdminMentorSearch />
        <div className="ad-mentor-headings">
          <h1>Name</h1>
          <h1>Stack Preference</h1>
          <h1></h1>
        </div>
        <AdminMentorCard />
      </div>
    )
  }
}

export default AdminDashboard;