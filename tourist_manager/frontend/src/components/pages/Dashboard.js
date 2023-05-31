import Dailyqueue from './Dailyqueue'
import React, { useState, Fragment } from 'react'
import Vehicleform from './Vehicleform'
import { Card } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import BG from '../../assets/images/hero_img_1xx.png'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
function Dashboard(props) {

  return (
    <>
    {/*<section id='hero' style={{backgroundImage:`url(${BG})`, backgroundSize: 'cover', width:'100%', marginRight:'0px', marginLeft:'0px'}}>
       */}
    
    
    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', backgroundImage:`url(${BG})`, backgroundSize: 'cover' }}>

    <Card style={{ backgroundColor:'rgba(255, 255, 255, 0)', width: '3.3%', height: '100%', border: "none", display: 'flex', alignItems: 'flex-start', marginLeft: '0px', marginRight:'20px' }}>
    <Navbar expand="1px" style={{ backgroundColor:'rgba(200, 211, 211, 0.5)', zIndex: 9999}}>
      <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mt-auto" style={{height: '100%', width: '250px'}}>
            <Nav.Link href="/" style={{marginTop:'50px', marginRight:'0px'}}>
            <Button variant="success" style={{width:'100%', height:'100px'}}>HOME</Button>
            </Nav.Link>
            <Nav.Link href="/#/admindashboard" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="secondary" style={{width:'100%', height:'100px'}}>ADMIN</Button>
            </Nav.Link>
            <Nav.Link href="/#/quickstats" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="info" style={{width:'100%', height:'100px'}}>QUICK STATS</Button>
            </Nav.Link>
            <Nav.Link href="/#/overview" style={{marginTop:'20px', marginRight:'0px'}}>
            <Button variant="info" style={{width:'100%', height:'100px'}}>MASTER LIST</Button>
            </Nav.Link>
            <Nav.Link href="/#/logout" style={{marginTop:'200px', marginRight:'0px'}}>
            <Button variant="danger" style={{width:'100%', height:'50px'}}>LOGOUT</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</Card>

    <Card style={{backgroundColor:'rgba(255, 255, 255, 0)', width: '75%', height: '100%', border: "none", marginLeft: '25px' }}>
  <h4 className='center-text'>DAILY VEHICLE LIST</h4>
  <Dailyqueue />

</Card>

    <Card style={{backgroundColor:'rgba(255, 255, 255, 0)', width: '20%', height: '1100px', border: "none", marginTop: '63px', marginLeft: '70px', marginRight: '10px'}}>
        <Vehicleform  />
        {props.submit_vehicle === 'Success' && (
          <Alert
          variant="success"
         
          style={{
            width: '345px',
            position: 'absolute',
            top: '85%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          Added Vehicle Successfully
        </Alert>
        )}

        {props.submit_vehicle === 'Failed' && (
          <Alert
          variant="danger"
         
          style={{
            width: '345px',
            position: 'absolute',
            top: '85%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          Please Fill-Up The Form Completely
        </Alert>
        )}
        </Card>
     
  </div>
  
  </>
  )

}

const mapStateToProps = (state) => ({
  submit_vehicle: state.vehicles.submit_vehicle,
});

export default connect(mapStateToProps)(Dashboard);