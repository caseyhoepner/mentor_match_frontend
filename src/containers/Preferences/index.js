import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Preferences.css';
import Switch from 'react-toggle-switch';
import { changeMentorFilters }  from '../../actions/preferences-actions';


export class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontEnd: false,
      backEnd: false
    }
  }

  toggleFE = async () => {
    const { frontEnd } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ frontEnd: !frontEnd })
    changeMentorFilters(this.state)
  }
  toggleBE = async () => {
    const { backEnd } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ backEnd: !backEnd })
    changeMentorFilters(this.state)
  }

  render() {
    const { frontEnd, backEnd } = this.state;

    return (
      <div className={this.props.preferencesClicked ? 'p-preferences-container' : 'hide'}>
        <div className='p-toggle-option'>
          <p>Front-End</p>
            <Switch 
              onClick={this.toggleFE} 
              on={frontEnd} 
              name='frontEnd'
            />
        </div>          
        <div className='p-toggle-option'>
          <p>Back-End</p>
            <Switch 
              onClick={this.toggleBE} 
              on={backEnd} 
              name='backEnd'
            />
        </div>          
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeMentorFilters: (filters) => dispatch(changeMentorFilters(filters))
})

export default connect(null, mapDispatchToProps)(Preferences);