import React, { Component } from 'react';
import './Preferences.css';
import Switch from 'react-toggle-switch';


export class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      veteranSwitched: false,
      parentSwitched: false,
      lgbtqiaSwitched: false,
      maleSwitched: false,
      femaleSwitched: false,
      nonBinarySwitched: false,
      showPreferences: false
    }
  }

  toggleVeteran = () => {
    let { veteranSwitched } = this.state;

    this.setState({ veteranSwitched: !veteranSwitched })
  }

  toggleParent = () => {
    let { parentSwitched } = this.state;

    this.setState({ parentSwitched: !parentSwitched })
  }

  toggleLGBTQIA = () => {
    let { lgbtqiaSwitched } = this.state;

    this.setState({ lgbtqiaSwitched: !lgbtqiaSwitched })
  }
  toggleMale = () => {
    let { maleSwitched } = this.state;

    this.setState({ maleSwitched: !maleSwitched })
  }

  toggleFemale = () => {
    let { femaleSwitched } = this.state;

    this.setState({ femaleSwitched: !femaleSwitched })
  }

  toggleNonBinary = () => {
    let { nonBinarySwitched } = this.state;

    this.setState({ nonBinarySwitched: !nonBinarySwitched })
  }

  render() {
    const { showPreferences, veteranSwitched, parentSwitched, lgbtqiaSwitched, maleSwitched, femaleSwitched, nonBinarySwitched } = this.state;

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
              onClick={this.toggleLGBTQIA} 
              on={lgbtqiaSwitched} 
              name='lgbtqiaSwitched'
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
          <p>Female-Identifying</p>
            <Switch 
              onClick={this.toggleFemale} 
              on={femaleSwitched} 
              name='femaleSwitched'
            />
        </div>          
        <div className='p-toggle-option'>
          <p>Non-Binary</p>
            <Switch 
              onClick={this.toggleNonBinary} 
              on={nonBinarySwitched} 
              name='nonBinarySwitched'
            />
        </div>
      </div>
    )
  }
}

export default Preferences;