import React, { Component } from 'react';
import './AdminDashboard.css';
import AdminMentorSearch from '../../containers/AdminMentorSearch';
import AdminMentorCard from '../AdminMentorCard';
import AdminMentorModal from '../AdminMentorModal';
import { connect } from 'react-redux';
import uuid from 'uuid';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    }
  }

  filterBySearchTerm = () => {
    let { searchTerm, mentors } = this.props

    const searchedMentors = mentors.reduce((acc, mentor) => {
      const mentorKeys = Object.keys(mentor)
      const foundMentor = mentorKeys.find((key) => {
        if (typeof mentor[key] === 'string') {
          return (mentor[key].toLowerCase()).includes(searchTerm.toLowerCase())
        }
      })
      if (foundMentor) {
        acc.push(mentor)
      }
      return acc
    },[])

    return searchedMentors
  }

  render() {
    let mentorCards;
    let { showingAllMentors, mentors, searchTerm } = this.props

    if (!showingAllMentors) {
      const filteredMentors = mentors.filter(mentor => {
        return mentor.matched === false;
      })
        mentorCards = filteredMentors.map(mentor => {
        return <AdminMentorCard key={uuid()} mentor={mentor}/>
      })
    } else {
        mentorCards = mentors.map(mentor => {
        return <AdminMentorCard key={uuid()} mentor={mentor}/>
      })
    }

    if (searchTerm) {
      const searchedMentors = this.filterBySearchTerm()
      mentorCards = searchedMentors.map(mentor => {
        return <AdminMentorCard key={uuid()} mentor={mentor}/>
      })
    }

    if (this.props.modalInfo) {
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
          <AdminMentorModal currentMentor={this.props.modalInfo} />
          <AdminMentorSearch />
          <div className="ad-mentor-headings">
            <h1 className='ad-mentor-heading'>Profile Picture</h1>
            <h1 className='ad-mentor-heading'>Name</h1>
            <h1 className='ad-mentor-heading'>Stack Preference</h1>
            <h1 className='ad-mentor-heading'>Other Preferences</h1>
            <h1 className='ad-mentor-heading'>View/Edit</h1>
          </div>
          { mentorCards }
        </div>
      )
    } else {
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
            <h1 className='ad-mentor-heading'>Profile Picture</h1>
            <h1 className='ad-mentor-heading'>Name</h1>
            <h1 className='ad-mentor-heading'>Stack Preference</h1>
            <h1 className='ad-mentor-heading'>Other Preferences</h1>
            <h1 className='ad-mentor-heading'>View/Edit</h1>
          </div>
          { mentorCards }
        </div>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  mentors: state.mentors,
  modalInfo: state.modalInfo,
  showingAllMentors: state.showingAllMentors,
  searchTerm: state.searchTerm
})

export default connect(mapStateToProps)(AdminDashboard);






