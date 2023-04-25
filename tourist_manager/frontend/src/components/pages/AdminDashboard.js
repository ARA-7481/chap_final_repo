import React, { useState, Fragment } from 'react'
import Statistics from './Statistics'
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import withAuth from '../common/withAuth';
import WithAdmin from '../common/withAdmin';
import { connect } from 'react-redux';


function AdminDashboard(props){
  return (
    <Fragment>
      <div style={{ width: '120%', height:'100%'}}>
      <Statistics />
      </div>
    </Fragment>
  )
  }

  AdminDashboard.propTypes = {
    profile: PropTypes.any,
  };
  
  const mapStateToProps = (state) => ({
    profile: state.auth.profile,
  });

  export default withAuth(WithAdmin(connect(mapStateToProps)(AdminDashboard)));

