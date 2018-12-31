import React, { Component } from 'react';
import './AdminDashboard.css';
import AdminMentorSearch from '../../containers/AdminMentorSearch';
import AdminMentorCard from '../AdminMentorCard';
import AdminMentorModal from '../AdminMentorModal';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  filterBySearchTerm = () => {
    let { searchTerm, mentors } = this.props

    const searchedMentors = mentors.reduce((acc, mentor) => {
      const mentorKeys = Object.keys(mentor)
      const foundMentor = mentorKeys.find((key) => {
        let newMentor;
        if (typeof mentor[key] === 'string') {
          newMentor = (mentor[key].toLowerCase()).includes(searchTerm.toLowerCase())
        }
        return newMentor
      })
      if (foundMentor) {
        acc.push(mentor)
      }
      return acc
    },[])

    return searchedMentors
  }

  filterByPreference = (mentorCards) => {
    const finalMentorCards = [];

    if (this.props.mentorFilters.lgbtqSwitched) {
      const cards = mentorCards.filter(card => {
        return card.props.mentor.identity_preference.includes('LGBTQ+')
      })
      finalMentorCards.push(...cards)
    }

    if (this.props.mentorFilters.veteranSwitched) {
      const cards = mentorCards.filter(card => {
        return card.props.mentor.identity_preference.includes('Veteran')
      })
      finalMentorCards.push(...cards)
    }

    if (this.props.mentorFilters.parentSwitched) {
      const cards = mentorCards.filter(card => {
        return card.props.mentor.identity_preference.includes('Parent')
      })
      finalMentorCards.push(...cards)
    }

    if (this.props.mentorFilters.femaleSwitched) {
      const cards = mentorCards.filter(card => {
        return card.props.mentor.identity_preference.includes('Female-Identifying')
      })
      finalMentorCards.push(...cards)
    }

    if (this.props.mentorFilters.maleSwitched) {
      const cards = mentorCards.filter(card => {
        return card.props.mentor.identity_preference.includes('Male-Identifying')
      })
      finalMentorCards.push(...cards)
    }

    // let filteredMentorCards = [];
    // let filteredCards;
    // let moreFilteredCards;
    // const filterKeys = Object.keys(this.props.mentorFilters);

    // filterKeys.forEach(key => {
    //   filteredCards = mentorCards.filter(card => {
    //     // console.log(card)
    //     // console.log(key)
    //     return card.props.mentor.identity_preference.includes(key)})
    // })

    // filterKeys.forEach(key => {
    //   moreFilteredCards = mentorCards.filter(card => {
    //     console.log(card.props.mentor.identity_preference)
    //     return (card.props.mentor.identity_preference === '[]')
    //   })
    //   console.log(moreFilteredCards)
    // })

    // filteredMentorCards.push(...filteredCards)
    // filteredMentorCards.push(...moreFilteredCards)

    // console.log(moreFilteredCards)
    // console.log(filteredCards)
    // console.log(filteredMentorCards)
    // return filteredMentorCards;
    console.log(finalMentorCards)
  }

  render() {
    let { mentors, showingAllMentors, searchTerm, mentorFilters } = this.props
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

    if (Object.values(mentorFilters).includes(true)) {
      mentorCards = this.filterByPreference(mentorCards);
    }

    return (
      <div>
        <header className='ad-header'>
          <div className='ad-nav-btns'>
            <img 
              src={require('../../utils/assets/turing-full-grey.png')} 
              alt='Turing Logo' 
              className='ad-turing-logo' />
            <div className='ad-nav-btn-container'>
              <div className='ad-new-mentor-btn ad-nav-btn'>
                <div className='ad-nav-tagline-container'>
                  <NavLink
                    className='ad-nav-tagline'
                    to='/new-mentor-form'
                    target='_blank'
                    rel='noopener noreferrer'
                  >New
                  </NavLink>
                  <NavLink
                    className='ad-nav-tagline'
                    to='/new-mentor-form'
                    target='_blank'
                    rel='noopener noreferrer'
                  >Mentor Form
                  </NavLink>
                </div>
                <img src={require('../../utils/assets/nmf-icon.svg')} alt='New Mentor Form Logo' className='ad-nav-logo' />
              </div>
              <div className='ad-nav-btn'>
                <div className='ad-nav-tagline-container'>
                  <p className='ad-nav-tagline'>Sign in</p>
                  <p className='ad-nav-tagline'>with github</p>
                </div>
                <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='ad-nav-logo' />
              </div>
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
  mentorFilters: state.mentorFilters,
  modalInfo: state.modalInfo,
  showingAllMentors: state.showingAllMentors,
  searchTerm: state.searchTerm,
  isEditable: state.isEditable
})

export default connect(mapStateToProps)(AdminDashboard);