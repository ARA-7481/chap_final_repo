import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import { logout } from '../../actions/auth';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-dark" >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand text-white" href="/#/logout">
              Homepage
            </a>
            <ul className='navbar-nav ml-auto mt-2 mt-lg-0' >
                <li className='nav-item'>
                <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                    </li>
                <li className='nav-item'>
                <Link to="/admindashboard" className="nav-link text-white">Admin</Link>
                    </li>
                <li className='nav-item'>
                <Link to="/logout" className="nav-link text-white">Logout</Link>
                    </li>
            </ul>
          </div>
      </nav>
    );
  }
}


export default Header;