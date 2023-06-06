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
import BG from '../../assets/images/hero_img_1xx.png'

function AdminDashboard(props){
  return (
    <div style={{display: 'flex', width: '100%', height: '100%', backgroundImage:`url(${BG})`, backgroundSize: 'cover'}}>
    <Card style={{backgroundColor:'rgba(255, 255, 255, 0)', width: '2.3%', height: '100%', border: "none", display: 'flex', alignItems: 'flex-start', marginLeft: '0px', marginRight:'20px' }}>
<Navbar expand="1px" style={{ backgroundColor:'rgba(200, 211, 211, 0.85)', zIndex: 9999}}>
      <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mt-auto" style={{height: '100%', width:'250px'}}>
            <Nav.Link href="/" style={{marginTop:'50px', marginRight:'0px'}}>
            <Button variant="success" style={{width:'100%', height:'100px'}}>HOME</Button>
            </Nav.Link>
            <Nav.Link href="/#/dashboard" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="secondary" style={{width:'100%', height:'100px'}}>VEHICLE INPUT</Button>
            </Nav.Link>
            <Nav.Link href="/#/checker" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="secondary" style={{width:'100%', height:'100px'}}>CHECKER DASHBOARD</Button>
            </Nav.Link>
            <Nav.Link href="/#/logout" style={{marginTop:'440px', marginRight:'0px'}}>
            <Button variant="danger" style={{width:'100%', height:'50px'}}>LOGOUT</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Card>

    <Card style={{backgroundColor:'rgba(255, 255, 255, 0)', width: '100%', height: '1200px', border: "none", marginLeft: '25px'}}>
      <Statistics />
      </Card>
      </div>
      
  )
  }

  AdminDashboard.propTypes = {
    profile: PropTypes.any,
  };
  
  const mapStateToProps = (state) => ({
    profile: state.auth.profile,
  });

  export default withAuth(WithAdmin(connect(mapStateToProps)(AdminDashboard)));
