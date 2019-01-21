import React, { Component } from 'react';
import './NewStudentForm.css';
import { postStudent } from '../../utils/api';
import { connect } from 'react-redux';

export class NewStudentForm extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      pronouns: '',
      email: '',
      slack_username: '',
      industries: [],
      background: '',
      identity_marker: [],
      stack: '',
      hasErrored: false
    }
  }

  postNewStudent = async () => {
    const { location } = this.props.history;
    const { history, token } = this.props;

    if (this.validateForm()) {
      postStudent(this.state, token);
      history.push('/success', {from: location.pathname});

    } else {
      this.setState({ hasErrored: true })
    }
  }

  validateForm = () => {
    const { 
      name,
      email,
      slack_username,
      stack 
    } = this.state;

    if (name && email && slack_username && stack) {
      return true;
    } else {
      return false;
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
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
        let correctItem;
        if (item !== checkedItem) {
          correctItem = item;
        }
        return correctItem
      })
      this.setState({ [stateKey]: newState });
    }
  }

  render() {
    const { 
      name,
      pronouns,
      email,
      slack_username,
      // industries,
      background,
      // identity_marker,
      stack,
      hasErrored
    } = this.state;
    
    return (
      <div className='nsf-container'>
        <div className='nsf-colors'>
          <div className='nsf-color-yellow nsf-color'></div>
          <div className='nsf-color-red nsf-color'></div>
          <div className='nsf-color-blue nsf-color'></div>
        </div>
        <div className='nsf-title-container'>
          <h1 className='nsf-title'>New</h1>
          <h1 className='nsf-title'>Student</h1>
          <h1 className='nsf-title'>Form</h1>
        </div>
      <div className='nsf-questions'>
        <p className='nsf-instructions'>("*" denotes required field)</p>
        <h2 className='nsf-question'>Name<span className='nsf-required-star'> *</span></h2>
          <input 
            name='name' 
            value={name} 
            onChange={this.handleChange} 
            className='nsf-input' 
            placeholder='Full Name'
            maxLength='50'
          />

        <h2 className='nsf-question'>Preferred pronouns:</h2>
          <input 
            name='pronouns' 
            value={pronouns} 
            onChange={this.handleChange} 
            className='nsf-input' 
            placeholder='Example: she/her/hers'
            maxLength='20'
          />

          <h2 className='nsf-question'>Program:<span className='nsf-required-star'> *</span></h2>
          <div>
            <select 
              className='nsf-capacity-dropdown'
              name='stack' 
              value={stack} 
              onChange={this.handleChange}
            >
              <option value="">Select program:</option>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
            </select>
          </div>
          
        <h2 className='nsf-question'>Contact info:<span className='nsf-required-star'> *</span></h2>
            <input 
              name='email' 
              value={email} 
              onChange={this.handleChange}  
              className='nsf-input' 
              placeholder='Email'
              maxLength='50'
            />
            <input 
              name='slack_username' 
              value={slack_username} 
              onChange={this.handleChange}  
              className='nsf-input' 
              placeholder='Slack'
              maxLength='30'
            />

        <h2 className='nsf-question'>Previous Industry Experience:</h2>
          <div className='nsf-options-container'>
              <label data-name='industries' className="nsf-checkbox-container">Marketing/Sales
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Arts
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Non profits/Volunteer work
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Business
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Teaching
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Law
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Medicine
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Food/Customer Service
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Retail
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
              <label data-name='industries' className="nsf-checkbox-container">Tech Trades
                <input type="checkbox" />
                <span 
                  onClick={this.handleClick} 
                  className='nsf-checkmark'
                >
                </span>
              </label>
          </div>

        <h2 className='nsf-question'>Background:</h2>
          <textarea 
            name='background' 
            value={background} 
            onChange={this.handleChange} 
            className='nsf-textarea'
            maxLength='250'
          />

          <h2 className='nsf-question'>Identity Markers:</h2>
            <div className='nsf-options-container'>
              <label data-name='identity_marker' className="nsf-checkbox-container">Veteran
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nsf-checkmark"></span>
              </label>
              <label data-name='identity_marker' className="nsf-checkbox-container">Parent
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nsf-checkmark"></span>
              </label>
              <label data-name='identity_marker' className="nsf-checkbox-container">LGBTQ+
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nsf-checkmark"></span>
              </label>
              <label data-name='identity_marker' className="nsf-checkbox-container">Female-Identifying
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nsf-checkmark"></span>
              </label>
              <label data-name='identity_marker' className="nsf-checkbox-container">Male-Identifying
                <input type="checkbox" />
                <span onClick={this.handleClick} className="nsf-checkmark"></span>
              </label>
            </div>

        </div>
        <p className={ hasErrored ? 'nsf-error' : 'hide' }>Make sure all required fields ("*") have been filled in.</p>
        <button 
            className='nsf-submit-btn'
            onClick={this.postNewStudent}>Submit</button>
        <div className='nmf-colors'>
          <div className='nsf-color-yellow nmf-color'></div>
          <div className='nsf-color-red nmf-color'></div>
          <div className='nsf-color-blue nmf-color'></div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(mapStateToProps)(NewStudentForm);