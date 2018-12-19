import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
    [name]: value
    })
  }

  render() {
    return (
      <div className='l-container'>
        <h1>Mentor Login</h1>
          <form className='l-form'>
            <input className='l-input l-form-item' onChange={this.handleChange} name='email' type='text' value={this.state.email} placeholder='Enter your email address, mthfkr.'/>
            <input className='l-input l-form-item' onChange={this.handleChange} name='password' type='password' value={this.state.password} placeholder='Enter your password, mthfkr.'/>
            <button className='l-login-btn l-form-item'>Login</button>
          </form>
      </div>
      )
  }
}

export default Login;