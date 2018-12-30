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
    let { mentors, showingAllMentors, searchTerm } = this.props
    let mentorCards;
    let studentCards = <p className='ad-student-card'>No students to display.</p>
    let modal;

    if (this.props.modalInfo) {
      modal = <AdminMentorModal currentMentor={this.props.modalInfo} />
    }

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

    return (
      <div>
        <header className='ad-header'>
          <div className='ad-nav-btns'>
            <img 
              src={require('../../utils/assets/turing-full-grey.png')} 
              alt='Turing Logo' 
              className='ad-turing-logo' />
            <div className='ad-github-btn'>
              <div className='ad-gh-tagline-container'>
                <p className='ad-gh-tagline'>Sign in</p>
                <p className='ad-gh-tagline'>with github</p>
              </div>
              <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='ad-github-logo' />
            </div>
          </div>
          <div className='ad-title'>
            <img 
              className='ad-tools-svg'
              src={require('../../utils/assets/tools.svg')}
              alt='Icon of some tools'
            />
            <h1 className='ad-title-text'>Admin Dashboard</h1>
            <p className='ad-tagline'>Filter mentors and students to find a match!</p>
          </div>
        </header>
        { modal }
        <AdminMentorSearch />
        <section className='ad-cards-container'>
          <div className='ad-mentor-cards-container'>
            <div className='ad-cards-header'>
              <h2 className='ad-cards-title'>Mentors</h2>
              <div className='ad-heading-container'>
                <p className='ad-heading-item ad-name-title'>Name</p>
                <p className='ad-heading-item ad-pref-title'>Mentee Preferences</p>
                <p className='ad-heading-item ad-matched-title'>Availability</p>
              </div>
            </div>
            { mentorCards }
          </div>
          <div className='ad-student-cards-container'>
            <div className='ad-cards-header'>
              <h2 className='ad-cards-title'>Students</h2>
              <div className='ad-heading-container'>
                <p className='ad-heading-item ad-name-title'>Name</p>
                <p className='ad-heading-item ad-pref-title'>Mentor Preferences</p>
                <p className='ad-heading-item ad-matched-title'>Availability</p>
              </div>
            </div>
            { studentCards }
          </div>
        </section>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  mentors: state.mentors,
  modalInfo: state.modalInfo,
  showingAllMentors: state.showingAllMentors,
  searchTerm: state.searchTerm
})

export default connect(mapStateToProps)(AdminDashboard);