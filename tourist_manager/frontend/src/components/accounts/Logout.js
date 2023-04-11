import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import withAuth from '../common/withAuth';


function Logout(props) {
    const navigate = useNavigate();
    useEffect(() => {
      props.logout();
      navigate('/login');
    }, []);
  
    return null;
  }
  
  Logout.propTypes = {
    logout: PropTypes.func.isRequired,
  };

  export default connect(null, { logout })(Logout);