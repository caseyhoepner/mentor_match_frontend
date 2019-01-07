import React, { Component } from 'react';
import './MentorContainer.css';
import Search from '../../containers/Search';
import { MentorCard } from '../../containers/MentorCard';
import { connect } from 'react-redux';
import uuid from 'uuid';

export class MentorContainer extends Component {

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

  filterByLocale = (cards) => {
    let { locale } = this.props
    let filteredCards;
    
    if (locale === 'Denver') {
      filteredCards = cards.filter((card) => !card.props.mentor.meeting_location.includes('Remote'))
    } else if (locale === 'Remote') {
      filteredCards = cards.filter((card) => card.props.mentor.meeting_location.includes('Remote'))
    }
    return filteredCards
  }

  filterByPreference = (studentCards) => {
    let { mentorFilters } = this.props
    let filterKeys = Object.keys(mentorFilters)
    let finalCards = []

    let trueVals = filterKeys.filter((key) => {
      let foundKey;
      if (mentorFilters[key] === true) {
        foundKey = key
      }
      return foundKey
    });

    studentCards.forEach((card) => {   
      let checkedCard = this.checkPrefs(card, trueVals)
      if (checkedCard) {
        finalCards.push(checkedCard)
      }
    })    
    return finalCards
  }

  cleanPrefs = (str) => {
    if (str === 'Front-End') {
      return 'frontEnd'
    } else if (str === 'Back-End') {
      return 'backEnd'
    } else {
      return str.toLowerCase()
    }
  }

  checkPrefs(card, valArr) {
    let { identity_preference, stack_preference } = card.props.mentor
    let totalPrefs = [...identity_preference, stack_preference]
    totalPrefs = totalPrefs.map((pref) => {
      return this.cleanPrefs(pref)
    })
    let finalCard;

    if (valArr.length === 2) {
   
      if (totalPrefs.includes(valArr[0]) 
        && totalPrefs.includes(valArr[1])
      ) {
        finalCard = card
      }

    } else if (valArr.length === 1) {

      if (totalPrefs.includes(valArr[0])) {
        finalCard = card
      }

    }
    return finalCard
  }

  makeMentorCards = (mentorCards) => {
    return mentorCards.map(mentor => {
      return <MentorCard key={uuid()} mentor={mentor} />
    })
  }

  render() {
    let { mentors, showingAllMentors, searchTerm, mentorFilters, locale } = this.props
    let mentorCards;

    if (!showingAllMentors) {
      const filteredMentors = mentors.filter(mentor => {
        return mentor.matched === false;
      })
        mentorCards = filteredMentors.map(mentor => {
        return <MentorCard key={uuid()} mentor={mentor}/>
      })
    } else {
        mentorCards = mentors.map(mentor => {
        return <MentorCard key={uuid()} mentor={mentor}/>
      })
    }

    if (searchTerm) {
      const searchedMentors = this.filterBySearchTerm()
      mentorCards = searchedMentors.map(mentor => {
        return <MentorCard key={uuid()} mentor={mentor}/>
      })
    }

    if (locale) {
      mentorCards = this.filterByLocale(mentorCards)
    }

    if (Object.values(mentorFilters).includes(true)) {
      mentorCards = this.filterByPreference(mentorCards);
    }

    mentorCards = this.makeMentorCards(mentorCards);

    return (
      <div>
        <header className='mc-header'>
          <div className='mc-nav-btns'>
            <img src={require('../../utils/assets/turing-full-black.png')} alt='Turing Logo' className='mc-turing-logo' />
            <div className='mc-github-btn'>
              <a href='https://github.com/login/oauth/authorize?client_id=81ef33f7e5b1e21f0162&scope=repo' className='mc-gh-tagline'>Sign in with GitHub</a>
              <img src={require('../../utils/assets/github-logo.svg')} alt='GitHub Logo' className='mc-github-logo' />
            </div>
          </div>
          <div className='mc-title'>
            <h1 className='mc-title-text'>Mentor Profiles</h1>
            <div className='mc-line-break'></div>
            <p className='mc-tagline'>Browse current mentors to find your match!</p>
          </div>
        </header>
        <Search />
        <div className='mc-card-container'>
          { mentorCards }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  mentors: state.mentors,
  mentorFilters: state.mentorFilters,
  locale: state.locale,
  searchTerm: state.searchTerm,
  showingAllMentors: state.showingAllMentors
})

export default connect(mapStateToProps)(MentorContainer);