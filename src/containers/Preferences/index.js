import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Preferences.css';
import Switch from 'react-toggle-switch';
import { changeMentorFilters }  from '../../actions/preferences-actions';


export class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      veteranSwitched: false,
      parentSwitched: false,
      lgbtqSwitched: false,
      femaleSwitched: false,
      maleSwitched: false,
      frontEndSwitched: false,
      backEndSwitched: false
    }
  }

  toggleVeteran = async () => {
    const { veteranSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ veteranSwitched: !veteranSwitched })
    changeMentorFilters(this.state)
  }

  toggleLgbtq = async () => {
    const { lgbtqSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ lgbtqSwitched: !lgbtqSwitched })
    changeMentorFilters(this.state)
  }

  toggleParent = async () => {
    const { parentSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ parentSwitched: !parentSwitched })
    changeMentorFilters(this.state)
  }

  toggleFemale = async () => {
    const { femaleSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ femaleSwitched: !femaleSwitched })
    changeMentorFilters(this.state)
  }  

  toggleMale = async () => {
    const { maleSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ maleSwitched: !maleSwitched })
    changeMentorFilters(this.state)
  }

  toggleFE = async () => {
    const { frontEndSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ frontEndSwitched: !frontEndSwitched })
    changeMentorFilters(this.state)
  }
  toggleBE = async () => {
    const { backEndSwitched } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ backEndSwitched: !backEndSwitched })
    changeMentorFilters(this.state)
  }

  render() {
    const { veteranSwitched, parentSwitched, frontEndSwitched, backEndSwitched, lgbtqSwitched, femaleSwitched, maleSwitched } = this.state;

    return (
      <div className={this.props.preferencesClicked ? 'p-preferences-container' : 'hide'}>
        <div className='p-toggle-option'>
          <p>Veteran</p>
            <Switch 
              onClick={this.toggleVeteran} 
              on={veteranSwitched}
              name='veteranSwitched'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Parent</p>
            <Switch 
              onClick={this.toggleParent} 
              on={parentSwitched}
              name='parentSwitched'
            />
        </div>
        <div className='p-toggle-option'>
          <p>LGBTQIA+</p>
            <Switch 
              onClick={this.toggleLgbtq} 
              on={lgbtqSwitched}
              name='lgbtqSwitched'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Female-Identifying</p>
            <Switch 
              onClick={this.toggleFemale} 
              on={femaleSwitched}
              name='femaleSwitched'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Male-Identifying</p>
            <Switch 
              onClick={this.toggleMale} 
              on={maleSwitched}
              name='maleSwitched'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Front-End</p>
            <Switch 
              onClick={this.toggleFE} 
              on={frontEndSwitched} 
              name='frontEndSwitched'
            />
        </div>          
        <div className='p-toggle-option'>
          <p>Back-End</p>
            <Switch 
              onClick={this.toggleBE} 
              on={backEndSwitched} 
              name='backEndSwitched'
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