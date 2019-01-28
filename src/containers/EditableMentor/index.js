import React, { Component }from 'react';
import { patchMentor } from '../../utils/api';
import './EditableMentor.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEditable, setMentorModal, updateChangedMentor } from '../../actions/mentor-actions';

export class EditableMentor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
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
      identity_preference: [],
      mentee_capacity: '0',
      meeting_location: [],
      stack_preference: '',
      active: true,
      matched: false
    }
  }

  componentDidMount = async () => {
    const {
      id,
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
      identity_preference, 
      mentee_capacity, 
      meeting_location, 
      stack_preference,
      active,
      matched
      } = this.props.currentMentor;

    await this.setState({
      id,
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
      identity_preference, 
      mentee_capacity, 
      meeting_location, 
      stack_preference,
      active,
      matched
    })
  }

  patchMentor = async () => {
    let { token } = this.props
    
    await patchMentor(this.state, token)
    await this.props.setMentorModal(this.state)
    await this.props.updateChangedMentor(this.state);
    await this.props.openEditMentor(false)
    this.props.history.push('/admin-dashboard')
  }

  handleChangeRadio = (event) => {
    const { value, className } = event.target;
    
    this.setState({ [className]: value })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  exitEdit = () => {
    this.props.openEditMentor(false)
    this.props.history.push('/admin-dashboard')
  }

  handleClick = (event) => {
    const checkedItem = event.target.parentNode.innerText;
    const stateKey = event.target.parentNode.getAttribute('data-name');

    this.checkIndustries(checkedItem, stateKey)
  }

  checkIndustries = (checkedItem, stateKey) => {
    const state = this.state[stateKey];

    if (!state.includes(checkedItem)) {
      state.push(checkedItem)
      this.setState({ [stateKey]: state });

    } else if (state.includes(checkedItem)) {
      const newState = state.filter(item => {
        let neededMentor;
        if (item !== checkedItem) {
          neededMentor =  item;
        }
        return neededMentor
      })
      this.setState({ [stateKey]: newState });
    }
  }

  checkIfChecked = (stateKey, val) => {
    if(this.state[stateKey]) {
      if(this.state[stateKey].includes(val)) {
        return true
      } else {
        return false;
      }
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
      // industries,
      background,
      // ways_to_mentor,
      // expertise_tech,
      // expertise_non_tech,
      // preferences,
      mentee_capacity,
      // meeting_location,
      stack_preference,
      active
    } = this.state;
    
    return (
      <div className='em-container'>
        <div className='em-title-box'>
          <h1 className='em-title'>Edit Mentor</h1>
          <button 
            className='em-exit-btn' 
            onClick={this.exitEdit}
          >X</button>
        </div>
        <h2 className='em-question'>Active?</h2>
        <label className="em-radio-container-1">No
          <input 
            value='false'
            className='active' 
            type="radio" 
            name="em-active"
            checked={!active}
            onChange={this.handleChangeRadio}
          />
          <span className="em-radio-checkmark-1"></span>
        </label>
        <label className="em-radio-container-1">Yes
          <input 
            value='true'
            className='active' 
            type="radio" 
            name="em-active"
            checked={active}
            onChange={this.handleChangeRadio}
          />
          <span className="em-radio-checkmark-1"></span>
        </label>

        <h2 className='em-question'>What is your name?</h2>
          <input 
            name='name' 
            value={name} 
            onChange={this.handleChange} 
            className='em-input' 
            placeholder='Full Name'
          />

        <h2 className='em-question'>What are your preferred pronouns?</h2>
          <input 
            name='pronouns' 
            value={pronouns} 
            onChange={this.handleChange} 
            className='em-input' 
            placeholder='Example: she/her/hers'
          />

        <h2 className='em-question'>What is your contact info for students to be able to reach you?</h2>
            <input 
              name='email' 
              value={email} 
              onChange={this.handleChange}  
              className='em-input' 
              placeholder='Email'
            />
            <input 
              name='slack_username' 
              value={slack_username} 
              onChange={this.handleChange}  
              className='em-input' 
              placeholder='Slack'
            />

        <h2 className='em-question'>Where are you located?</h2>
            <input 
              name='city' 
              value={city} 
              onChange={this.handleChange}  
              className='em-input' 
              placeholder='City'
            />
            <input 
              name='state' 
              value={state} 
              onChange={this.handleChange}  
              className='em-input' 
              placeholder='State'
            />
            <input 
              name='country' 
              value={country} 
              onChange={this.handleChange}  
              className='em-input' 
              placeholder='Country'
            />

        <h2 className='em-question'>Current Employment:</h2>
          <input 
            name='current_employer' 
            value={current_employer} 
            onChange={this.handleChange}  
            className='em-input' 
            placeholder='Current Employer'
          />
          <input 
            name='current_title' 
            value={current_title} 
            onChange={this.handleChange}  
            className='em-input' 
            placeholder='Job Title'
          />

        <h2 className='em-question'>What industries have you had tech experience in?</h2>
          <div className='em-options-container'>
              <label data-name='industries' className="em-checkbox-container">AdTech
                <input 
                checked={this.checkIfChecked('industries', 'AdTech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">Green Tech
                <input 
                  checked={this.checkIfChecked('industries', 'Green Tech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">Civic Tech
                <input 
                  checked={this.checkIfChecked('industries', 'Civic Tech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">FinTech
                <input 
                  checked={this.checkIfChecked('industries', 'FinTech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">EdTech
                <input 
                  checked={this.checkIfChecked('industries', 'EdTech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">LegalTech
                <input 
                  checked={this.checkIfChecked('industries', 'LegalTech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">HealthTech
                <input 
                  checked={this.checkIfChecked('industries', 'HealthTech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">Marketing Tech
                <input 
                  checked={this.checkIfChecked('industries', 'Marketing Tech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="em-checkbox-container">Blockchain Tech
                <input 
                  checked={this.checkIfChecked('industries', 'Blockchain Tech')}
                  type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='em-checkmark'
                >
                </span>
              </label>
          </div>

        <h2 className='em-question'>Brief background: What would you like students to know about you? Turing Alum? Job history? Hobbies? </h2>
          <textarea 
            name='background' 
            value={background} 
            onChange={this.handleChange} 
            className='em-textarea'
          />

        <h2 className='em-question'>Areas of Technical Expertise:</h2>
          <div className='em-options-container'>
            <label data-name='expertise_tech' className="em-checkbox-container">Ruby/Rails
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Ruby/Rails')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">DevOps
              <input 
                checked={this.checkIfChecked('expertise_tech', 'DevOps')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Go
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Go')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Data Science
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Data Science')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Machine Learning
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Machine Learning')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Functional Programming
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Functional Programming')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">CS Fundamentals
              <input 
                checked={this.checkIfChecked('expertise_tech', 'CS Fundamentals')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Node.js
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Node.js')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">React.js
              <input 
                checked={this.checkIfChecked('expertise_tech', 'React.js')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Angular.js
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Angular.js')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Ember.js
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Ember.js')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">Vue.js
              <input 
                checked={this.checkIfChecked('expertise_tech', 'Vue.js')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">UX/UI Development
              <input 
                checked={this.checkIfChecked('expertise_tech', 'UX/UI Development')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
            <label data-name='expertise_tech' className="em-checkbox-container">CSS/SCSS/Sass
              <input 
                checked={this.checkIfChecked('expertise_tech', 'CSS/SCSS/Sass')}
                type="checkbox" />
              <span 
                onClick={this.handleClick} 
                className="em-checkmark em-tech-expert">
              </span>
            </label>
          </div>

        <h2 className='em-question'>Areas of Non-Technical Expertise:</h2>
          <div className='em-options-container'>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Public Speaking
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Public Speaking')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Wellness & Stress Management
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Wellness & Stress Management')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Project Management
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Project Management')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Culture/Behavioral Interview Prep
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Culture/Behavioral Interview Prep')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Parenting
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Parenting')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Functional Programming
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Functional Programming')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='expertise_non_tech' className="em-checkbox-container">Social Issues in the Tech Industry
              <input 
                checked={this.checkIfChecked('expertise_non_tech', 'Social Issues in the Tech Industry')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
          </div>

        <h2 className='em-question'>In what ways would you like to support Turing mentees?</h2>
          <div className='em-options-container'>
            <label data-name='ways_to_mentor' className="em-checkbox-container">Mock Interviews
              <input
                checked={this.checkIfChecked('ways_to_mentor', 'Mock Interviews')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='ways_to_mentor' className="em-checkbox-container">Resume & Cover Letters
              <input
                checked={this.checkIfChecked('ways_to_mentor', 'Resume & Cover Letters')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='ways_to_mentor' className="em-checkbox-container">Coffee Meetings
              <input
                checked={this.checkIfChecked('ways_to_mentor', 'Coffee Meetings')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
          </div>

        <h2 className='em-question'>How many students would you like to mentor?</h2>
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

        <h2 className='em-question'>Are there any identity markers you'd particularly like to work with (only shared with staff)?</h2>
          <div className='em-options-container'>
            <label data-name='identity_preference' className="em-checkbox-container">Veteran
              <input 
                checked={this.checkIfChecked('identity_preference', 'Veteran')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='identity_preference' className="em-checkbox-container">Parent
              <input 
                checked={this.checkIfChecked('identity_preference', 'Parent')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='identity_preference' className="em-checkbox-container">LGBTQ+
              <input 
                checked={this.checkIfChecked('identity_preference', 'LGBTQ+')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='identity_preference' className="em-checkbox-container">Female-Identifying
              <input 
                checked={this.checkIfChecked('identity_preference', 'Female-Identifying')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='identity_preference' className="em-checkbox-container">Male-Identifying
              <input 
                checked={this.checkIfChecked('identity_preference', 'Male-Identifying')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
          </div>

        <h2 className='em-question'>Would you prefer Front-End or Back-End students?</h2>
          <label className="em-radio-container">No Preference
            <input 
              value='No Preference'
              className='stack_preference'
              type="radio" 
              name="em-FE-BE" 
              checked={stack_preference === 'No Preference'}
              onChange={this.handleChangeRadio}
            />
            <span className="em-radio-checkmark"></span>
          </label>
          <label className="em-radio-container">Front-End
            <input 
              value='Front-End'
              className='stack_preference'
              type="radio" 
              name="em-FE-BE" 
              checked={stack_preference === 'Front-End'}
              onChange={this.handleChangeRadio}
            />
            <span className="em-radio-checkmark"></span>
          </label>
          <label className="em-radio-container">Back-End
            <input 
              value='Back-End'
              className='stack_preference'
              type="radio" 
              name="em-FE-BE" 
              checked={stack_preference === 'Back-End'}
              onChange={this.handleChangeRadio}
            />
            <span className="em-radio-checkmark"></span>
          </label>

        <h2 className='em-question'>Where would you prefer to meet with mentees?</h2>
          <div className='em-options-container'>
            <label data-name='meeting_location' className="em-checkbox-container">In Person at Turing
              <input 
                checked={this.checkIfChecked('meeting_location', 'In Person at Turing')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='meeting_location' className="em-checkbox-container">In Person Not at Turing
              <input 
                checked={this.checkIfChecked('meeting_location', 'In Person Not at Turing')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
            <label data-name='meeting_location' className="em-checkbox-container">Remote
              <input 
                checked={this.checkIfChecked('meeting_location', 'Remote')}
                type="checkbox" />
              <span onClick={this.handleClick} className="em-checkmark"></span>
            </label>
          </div>
          <button onClick={this.patchMentor}>Submit</button>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  token: state.token
})

export const mapDispatchToProps = (dispatch) => ({
  openEditMentor: bool => dispatch(isEditable(bool)),
  setMentorModal: mentor => dispatch(setMentorModal(mentor)),
  updateChangedMentor: mentor => dispatch(updateChangedMentor(mentor))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditableMentor));