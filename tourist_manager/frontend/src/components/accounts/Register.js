import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import '../../css/login.css';
//import { register } from '../../actions/auth';


export class Register extends Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    accounttype: ''
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, firstname, lastname, password, accounttype} = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Firstname</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                onChange={this.onChange}
                value={firstname}
              />
            </div>

            <div className="form-group">
              <label>Lastname</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                onChange={this.onChange}
                value={lastname}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <input
                type="text"
                className="form-control"
                name="accounttype"
                onChange={this.onChange}
                value={accounttype}
              />
            </div>
            

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}



export default Register;