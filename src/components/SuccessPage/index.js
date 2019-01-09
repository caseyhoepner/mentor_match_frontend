import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SuccessPage.css';

export const SuccessPage = (props) => {
  const { state } = props.history.location;
  let successMessage;

  if (state.from === "/new-student-form") {
    successMessage = (
      <div className='sp-text'>
        <p>New student successfully added!</p>
        <Link
          className='sp-new-student-btn'
          to='/new-student-form'
        >+ Add Another Student
        </Link>
      </div>
      )
  } else if (state.from === "/new-mentor-form") {
    successMessage = (
      <div className='sp-text'>
        <p>Thank you for your interest in mentoring our students. We will reach out to you shortly.</p>
        <p>If you have any questions, reach out to 
          <a 
            className='sp-email-link'
            href="mailto:kayt@turing.io"> kayt@turing.io
          </a>.</p>
      </div>
    )
  }


  return (
    <div className='sp-container'>
      <img 
        className='sp-icon'
        src={require('../../utils/assets/success-check.svg')}
        alt='Success Icon'
        />
      <h1 className='sp-title'>Success!</h1>
      { successMessage }
    </div>
  )
}

export default withRouter(SuccessPage);