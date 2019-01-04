import React, { Component } from 'react';
import './AdminDashboard.css';
import AdminMentorSearch from '../../containers/AdminMentorSearch';
import AdminStudentCard from '../../containers/AdminStudentCard';
import AdminMentorCard from '../AdminMentorCard';
import AdminMentorModal from '../AdminMentorModal';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid';

export class AdminDashboard extends Component {

  filterBySearchTerm = () => {
    let { searchTerm, mentors } = this.props

    const searchedMentors = mentors.reduce((acc, mentor) => {
      const mentorKeys = Object.keys(mentor)
      const foundMentor = mentorKeys.find((key) => {
        let newMentor;
        if (typeof mentor[key] === 'string') {
          newMentor = (mentor[key].toLowerCase()).includes(searchTerm.toLowerCase())
        }
        return newMentor;
      })
      if (foundMentor) {
        acc.push(mentor)
      }
      return acc
    },[])

    return searchedMentors;
  }

  filterByLocale = (cards) => {
    let { locale } = this.props;
    let filteredCards;
    
    if (locale === 'Denver') {
      filteredCards = cards.filter((card) => !card.props.mentor.meeting_location.includes('Remote'))
    } else if (locale === 'Remote') {
      filteredCards = cards.filter((card) => card.props.mentor.meeting_location.includes('Remote'))
    }
    return filteredCards;
  }

  filterByPreference = (mentorCards) => {
    let { mentorFilters } = this.props;
    let filterKeys = Object.keys(mentorFilters);
    let finalCards = [];
    let trueVals = filterKeys.filter((key) => {
      let foundKey;
      if (mentorFilters[key] === true) {
        foundKey = key
      }
      return foundKey
    });

    mentorCards.forEach((card) => {   
      let checkedCard = this.checkPrefs(card, trueVals);

      if (checkedCard) {
        finalCards.push(checkedCard);
      }
    })    
    return finalCards;
  }

  cleanPrefs = (str) => {
    if (str === 'LGBTQ+') {
      return 'lgbtq';
    } else if (str === 'Female-Identifying') {
      return 'female';
    } else if (str === 'Male-Identifying') {
      return 'male';
    } else if (str === 'Front-End') {
      return 'frontEnd';
    } else if (str === 'Back-End') {
      return 'backEnd';
    } else {
      return str.toLowerCase();
    }
  }

  checkPrefs(card, valArr) {
    let { identity_preference, stack_preference } = card.props.mentor;
    let totalPrefs = [...identity_preference, stack_preference];
    totalPrefs = totalPrefs.map((pref) => {
      return this.cleanPrefs(pref);
    })
    let finalCard;

    if (valArr.includes('frontEnd') && valArr.includes('backEnd')) {
      return
    } else if (valArr.length === 6) {

      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
        && totalPrefs.includes(valArr[2])
        && totalPrefs.includes(valArr[3])
        && totalPrefs.includes(valArr[4])
        && totalPrefs.includes(valArr[5])
      ) {
        finalCard = card;
      }

    } else if (valArr.length === 5) {

      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
        && totalPrefs.includes(valArr[2])
        && totalPrefs.includes(valArr[3])
        && totalPrefs.includes(valArr[4])
      ) {
        finalCard = card;
      }

    } else if (valArr.length === 4) {
   
      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
        && totalPrefs.includes(valArr[2])
        && totalPrefs.includes(valArr[3])
      ) {
        finalCard = card;
      }

    } else if (valArr.length === 3) {
   
      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
        && totalPrefs.includes(valArr[2])
      ) {
        finalCard = card;
      }

    } else if (valArr.length === 2) {
   
      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
      ) {
        finalCard = card;
      }

    } else if (valArr.length === 1) {

      if (totalPrefs.includes(valArr[0])) {
        finalCard = card;
      }

    }
    return finalCard
  }

  getStudentCards = () => {
    const { students } = this.props;

    if (students) {
      return students.map((student, index) => {
        return <AdminStudentCard key={student.id + index} student={student}/>
    })
  } else {
    return <p className='ad-student-card'>No students to display.</p>
    }
  }

  render() {
    let { mentors, showingAllMentors, searchTerm, mentorFilters, locale } = this.props;
    let mentorCards;
    let modal;
    let studentCards;

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

    if (locale) {
      mentorCards = this.filterByLocale(mentorCards)
    }

    if (Object.values(mentorFilters).includes(true)) {
      mentorCards = this.filterByPreference(mentorCards);
    }

    studentCards = this.getStudentCards();

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
                    to='/new-student-form'
                    target='_blank'
                    rel='noopener noreferrer'
                  >New
                  </NavLink>
                  <NavLink
                    className='ad-nav-tagline'
                    to='/new-student-form'
                    target='_blank'
                    rel='noopener noreferrer'
                  >Student Form
                  </NavLink>
                </div>
                <img src={require('../../utils/assets/nmf-icon.svg')} alt='New Mentor Form Logo' className='ad-nav-logo' />
              </div>
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
                <h2 className='ad-cards-title'>Mentors</h2>
                <div className='ad-mentor-heading'>
                  <p className='ad-name-title'>Name</p>
                  <p className='ad-stack-title'>Stack</p>
                  <p className='ad-pref-title'>Identity Preferences</p>
                  <p className='ad-matched-title'>Availability</p>
                </div>
              { mentorCards }
            </div>
            <div className='ad-student-cards-container'>
              <h2 className='ad-cards-title'>Students</h2>
              <div className='ad-student-heading'>
                <p className='ad-name-title'>Name</p>
                <p className='ad-stack-title'>Program</p>
                <p className='ad-pref-title'>Identity markers</p>
                <p className='ad-matched-title'>Availability</p>
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
  locale: state.locale,
  isEditable: state.isEditable,
  students: state.students
})

export default connect(mapStateToProps)(AdminDashboard);