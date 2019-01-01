import React, { Component } from 'react';
import './AdminStudentCard.css';
import { connect } from 'react-redux';
// import { setMentorModal } from '../../actions/mentor-actions';

export class AdminStudentCard extends Component {
  constructor(props) {
    super(props);
}

  render() {
    const { name, matched, stack } = this.props.student;

    return (
      <div className='amc-card'>
        <p className='amc-record-item'>{name}</p>
        <p className='amc-record-item'>{stack}</p>
        <div className='amc-record-item amc-matched'>
          <img 
            className='amc-matched-icon'
            alt='matched indicator'
            src={require(`../../utils/assets/matched-${matched}.svg`)} />
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(AdminStudentCard);