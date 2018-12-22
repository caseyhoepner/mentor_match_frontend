import React, { Component } from 'react';
import './Preferences.css';
import Switch from 'react-toggle-switch';


export class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      veteranSwitched: false,
      parentSwitched: false,
      frontEndSwitched: false,
      backEndSwitched: false,
    }
  }

  toggleVeteran = () => {
    const { veteranSwitched } = this.state;

    this.setState({ veteranSwitched: !veteranSwitched })
  }

  toggleParent = () => {
    const { parentSwitched } = this.state;

    this.setState({ parentSwitched: !parentSwitched })
  }

  toggleFE = () => {
    const { frontEndSwitched } = this.state;

    this.setState({ frontEndSwitched: !frontEndSwitched })
  }
  toggleBE = () => {
    const { backEndSwitched } = this.state;

    this.setState({ backEndSwitched: !backEndSwitched })
  }

  render() {
    const { veteranSwitched, parentSwitched, frontEndSwitched, backEndSwitched } = this.state;

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

export default Preferences;