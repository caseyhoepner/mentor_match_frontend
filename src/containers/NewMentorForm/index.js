import React, { Component } from 'react';
import './NewMentorForm.css';

class NewMentorForm extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      pronouns: '',
      email: '',
      slack_username: '',
      city: '',
      state: '',
      country: '',
      current_employer: '',
      current_title: '',
      industries: [],
      background: '',
      ways_to_mentor: [],
      expertise_tech: [],
      expertise_non_tech: [],
      preferences: [],
      mentee_capacity: '0',
      meeting_location: []
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    const { value, className } = event.target;

    if (className === 'nmf-checkmark nmf-industry-check') {
      const newIndustry = event.target.parentNode.innerText;

      this.checkIndustries(newIndustry)
    }
  }

  checkIndustries = (newIndustry) => {
    if (!this.state.industries.includes(newIndustry)){
      const industries = [...this.state.industries, newIndustry]
      this.setState({ industries });

    } else {
      const industries = this.state.industries.filter(industry => {
        if (industry !== newIndustry) {
          return industry;
        }
      })
      this.setState({ industries });
    }
  }

  render() {
    const { 
      name,
      pronouns,
      email,
      slack_username,
      city,
      state,
      country,
      current_employer,
      current_title,
      industries,
      background,
      ways_to_mentor,
      expertise_tech,
      expertise_non_tech,
      preferences,
      mentee_capacity,
      meeting_location 
    } = this.state;
    
    return (
      <div className='nmf-container'>
      <h1 className='nmf-title'>New Mentor Form</h1>
        <h2 className='nmf-question'>What is your name?</h2>
          <input 
            name='name' 
            value={name} 
            onChange={this.handleChange} 
            className='nmf-input' 
            placeholder='Full Name'
          />

        <h2 className='nmf-question'>What are your preferred pronouns?</h2>
          <input 
            name='pronouns' 
            value={pronouns} 
            onChange={this.handleChange} 
            className='nmf-input' 
            placeholder='Example: she/her/hers'
          />

        <h2 className='nmf-question'>What is your contact info for students to be able to reach you?</h2>
            <input 
              name='email' 
              value={email} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Email'
            />
            <input 
              name='slack_username' 
              value={slack_username} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Slack'
            />

        <h2 className='nmf-question'>Where are you located?</h2>
            <input 
              name='city' 
              value={city} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='City'
            />
            <input 
              name='state' 
              value={state} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='State'
            />
            <input 
              name='country' 
              value={country} 
              onChange={this.handleChange}  
              className='nmf-input' 
              placeholder='Country'
            />

        <h2 className='nmf-question'>Current Employment:</h2>
          <input 
            name='current_employer' 
            value={current_employer} 
            onChange={this.handleChange}  
            className='nmf-input' 
            placeholder='Current Employer'
          />
          <input 
            name='current_title' 
            value={current_title} 
            onChange={this.handleChange}  
            className='nmf-input' 
            placeholder='Job Title'
          />

        <h2 className='nmf-question'>What industries have you had tech experience in?</h2>
          <div className='nmf-options-container'>
              <label className="nmf-checkbox-container">AdTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">Green Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">Civic Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">FinTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">EdTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">LegalTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">HealthTech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">Marketing Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
              <label className="nmf-checkbox-container">Blockchain Tech
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nmf-checkmark nmf-industry-check'
                >
                </span>
              </label>
          </div>

        <h2 className='nmf-question'>Brief background: What would you like students to know about you? Turing Alum? Job history? Hobbies? </h2>
          <textarea 
            name='background' 
            value={background} 
            onChange={this.handleChange} 
            className='nmf-textarea'
          />

        <h2 className='nmf-question'>Areas of Technical Expertise:</h2>
          <div className='nmf-options-container'>
            <label className="nmf-checkbox-container">Ruby/Rails
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">DevOps
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Go
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Data Science
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Machine Learning
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Functional Programming
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">CS Fundamentals
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Node.js
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">React.js
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Angular.js
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Ember.js
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Vue.js
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">UX/UI Development
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">CSS/SCSS/Sass
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>Areas of Non-Technical Expertise:</h2>
          <div className='nmf-options-container'>
            <label className="nmf-checkbox-container">Public Speaking, Speaking proposals
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Wellness & Stress Management
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Project Management
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Culture/Behavioral Interview Prep
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Parenting
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Functional Programming
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Social Issues in the Tech Industry
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>In what ways would you like to support Turing mentees?</h2>
          <div className='nmf-options-container'>
            <label className="nmf-checkbox-container">Mock Interviews
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Resume & Cover Letters
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Coffee Meetings
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>Would you like to be a 1-to-1 mentor?</h2>
            <label className="nmf-radio-container">No
              <input 
                type="radio" 
                checked="checked" 
                name="radio" 
              />
              <span className="nmf-radio-checkmark"></span>
            </label>
            <label className="nmf-radio-container">Yes
              <input 
                type="radio" 
                name="radio" 
              />
              <span className="nmf-radio-checkmark"></span>
            </label>

        <h2 className='nmf-question'>How many students would you like to mentor?</h2>
          <div>
            <select 
              name='mentee_capacity' 
              value={mentee_capacity} 
              onChange={this.handleChange}
            >
              <option value="0">Select number:</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

        <h2 className='nmf-question'>Are there any identity markers you'd particularly like to work with (only shared with staff)?</h2>
          <div className='nmf-options-container'>
            <label className="nmf-checkbox-container">Veteran
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Parent
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">LGBTQ+
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Female-Identifying
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Male-Identifying
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">No Preference
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
          </div>

        <h2 className='nmf-question'>Would you prefer Front-End or Back-End students?</h2>
            <label className="nmf-radio-container">No Preference
              <input 
                type="radio" 
                checked="checked" 
                name="radio" 
              />
              <span className="nmf-radio-checkmark"></span>
            </label>
            <label className="nmf-radio-container">Front-End
              <input 
                type="radio" 
                name="radio" 
              />
              <span className="nmf-radio-checkmark"></span>
            </label>
            <label className="nmf-radio-container">Back-End
              <input 
                type="radio" 
                name="radio" 
              />
              <span className="nmf-radio-checkmark"></span>
            </label>  

        <h2 className='nmf-question'>Where would you prefer to meet with mentees?</h2>
          <div className='nmf-options-container'>
            <label className="nmf-checkbox-container">In Person at Turing
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">In Person Not at Turing
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
            <label className="nmf-checkbox-container">Remote (Slack call, Google Hangout, Zoom, etc.)
              <input type="checkbox" />
              <span className="nmf-checkmark"></span>
            </label>
          </div>
      </div>
    )
  }
}

export default NewMentorForm;