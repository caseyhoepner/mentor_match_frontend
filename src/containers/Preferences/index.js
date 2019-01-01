import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Preferences.css';
import Switch from 'react-toggle-switch';
import { changeMentorFilters }  from '../../actions/preferences-actions';


export class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      veteran: false,
      parent: false,
      lgbtq: false,
      female: false,
      male: false,
      frontEnd: false,
      backEnd: false
    }
  }

  toggleVeteran = async () => {
    const { veteran } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ veteran: !veteran })
    changeMentorFilters(this.state)
  }

  toggleLgbtq = async () => {
    const { lgbtq } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ lgbtq: !lgbtq })
    changeMentorFilters(this.state)
  }

  toggleParent = async () => {
    const { parent } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ parent: !parent })
    changeMentorFilters(this.state)
  }

  toggleFemale = async () => {
    const { female } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ female: !female })
    changeMentorFilters(this.state)
  }  

  toggleMale = async () => {
    const { male } = this.state;
    const { changeMentorFilters } = this.props;

    await this.setState({ male: !male })
    changeMentorFilters(this.state)
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
    const { veteran, parent, frontEnd, backEnd, lgbtq, female, male } = this.state;

    return (
      <div className={this.props.preferencesClicked ? 'p-preferences-container' : 'hide'}>
        <div className='p-toggle-option'>
          <p>Veteran</p>
            <Switch 
              onClick={this.toggleVeteran} 
              on={veteran}
              name='veteran'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Parent</p>
            <Switch 
              onClick={this.toggleParent} 
              on={parent}
              name='parent'
            />
        </div>
        <div className='p-toggle-option'>
          <p>LGBTQIA+</p>
            <Switch 
              onClick={this.toggleLgbtq} 
              on={lgbtq}
              name='lgbtq'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Female-Identifying</p>
            <Switch 
              onClick={this.toggleFemale} 
              on={female}
              name='female'
            />
        </div>
        <div className='p-toggle-option'>
          <p>Male-Identifying</p>
            <Switch 
              onClick={this.toggleMale} 
              on={male}
              name='male'
            />
        </div>
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