import React, { useState, Fragment } from 'react'
import Statistics from './Statistics'
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import withAuth from '../common/withAuth';
import WithAdmin from '../common/withAdmin';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Quickstats from './quickstats';


function AdminDashboard(props){
  return (
    <>
    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>

    <Card style={{ width: '2.3%', height: '100%', border: "none", display: 'flex', alignItems: 'flex-start', marginLeft: '0px', marginRight:'0px' }}>
<Navbar expand="1px" style={{ backgroundColor:'rgba(200, 211, 211, 0.85)', zIndex: 9999}}>
      <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mt-auto" style={{height: '1070px', width:'250px'}}>
            <Nav.Link href="/" style={{marginTop:'50px', marginRight:'0px'}}>
            <Button variant="success" style={{width:'100%', height:'100px'}}>HOME</Button>
            </Nav.Link>
            <Nav.Link href="/#/dashboard" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="secondary" style={{width:'100%', height:'100px'}}>STAFF DASHBOARD</Button>
            </Nav.Link>
            <Nav.Link href="" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="info" style={{width:'100%', height:'100px'}}>QUICK STATS</Button>
            </Nav.Link>
            <Nav.Link href="/#/overview" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="info" style={{width:'100%', height:'100px'}}>MASTER LIST</Button>
            </Nav.Link>
            <Nav.Link href="/#/logout" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="danger" style={{width:'100%', height:'100px'}}>LOGOUT</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Card>

    <Card style={{ width: '100%', height: '100%', border: "none", marginLeft: '0px', marginRight:'0px' }}>
      <Quickstats />
      </Card>
      </div>
    </>
  )
  }

  AdminDashboard.propTypes = {
    profile: PropTypes.any,
  };
  
  const mapStateToProps = (state) => ({
    profile: state.auth.profile,
  });

  export default withAuth(WithAdmin(connect(mapStateToProps)(AdminDashboard)));
