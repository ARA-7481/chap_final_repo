import React, { Component } from 'react';
import { Link, Redirect, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };


  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/dashboard"  />;
    }
    const { username, password } = this.state;
    return (
      <div className="d-flex justify-content-center" style={{marginTop: "120px"}}>
      <div className="col-md-5 " >
      
        <div className="card bg-transparent border-0 card-body mt-5 ml-1 mr-1" >
          <h2 className="text-center" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group text-right">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);