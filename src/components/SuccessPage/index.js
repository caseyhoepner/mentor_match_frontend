import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SuccessPage.css';

export const SuccessPage = (props) => {
  // const { history } = props;
  const { state } = props.history.location;
  let successMessage;

  if (state.from === "/new-student-form") {
    successMessage = (
      <div>
        <p>New student successfully added!</p>
        <Link
          className='sp-new-student-btn'
          to='/new-student-form'
        >Add Another Student
        </Link>
      </div>
      )
  } else if (state.from === "/new-mentor-form") {
    successMessage = (
      <div>
        <p>Thank you for signing up to be a mentor! We'll be in touch when we find you a student to mentor.</p>
      </div>
    )
  }


  return (
    <div className='sp-container'>
      <h1>Success!</h1>
      { successMessage }
    </div>
  )
}

export default withRouter(SuccessPage);