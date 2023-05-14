import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import { getStatistics } from '../../actions/vehicles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../reusable/Header';
import Alert from 'react-bootstrap/Alert';

//import '../../css/global.css';
import '../../css/landing_page.css';

import AboutPhoto from '../../assets/images/about_photo.png'
import WCYD1 from '../../assets/images/wcyd_1.png'
import WCYD2 from '../../assets/images/wcyd_2.png'
import WCYD3 from '../../assets/images/wcyd_3.png'
import WCYD4 from '../../assets/images/wcyd_4.png'
import WCYD5 from '../../assets/images/wcyd_5.png'
import WCYD6 from '../../assets/images/wcyd_6.png'
import BG from '../../assets/images/hero_img_1.png'
import Login from '../accounts/Login';


function Landingpage(props) {
  let totalPassengers = 0;


  props.vehiclesforstatistics.forEach((item) => {
    totalPassengers += item.passenger_count || 0;
  });
  
  useEffect(() => {
    const searchAll = ''
    props.getStatistics(searchAll);
  }, []);

  return (
    <>
    <div className='landing_page'>
      {/* Hero */}
      <section id='hero' style={{backgroundImage:`url(${BG})`, backgroundSize: 'cover', width:'100%', marginRight:'0px', marginLeft:'0px'}}>
     
        <div className='container' >
          <h1>
          <span className='label'>BOHOL ISLAND STATE UNIVERSITY</span>
            {/*<span className='label'>AS OF TODAY:</span>*/}
            <br/>
            {/*<span>{totalPassengers} </span>*/}
            <span>CHOCOLATE HILLS MANAGEMENT SYSTEM</span>
          </h1>
          
          <p style={{lineHeight:'1', fontSize: '20px'}}>Behold Bohol, It's More Fun The Philippines!</p>

          <div className='container'>
          <div className='mx-auto'>
            <Login />
          </div>
          {props.message === 'Invalid Credentials' && (
        <Alert
        variant="danger"
        style={{
          width: '410px',
          position: 'absolute',
          top: '85%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      >
        {props.message}
      </Alert>
      )}
        </div>
          <div className='background-images'>
            <div id='bg-1'>
              <div className='overlay'></div>
            </div>
          </div>



        </div>
      </section>

      {/* FAQs */}
      <section id='faqs' style={{width:'100%', marginTop:'0px'}}>
        <div className='container' style={{marginBottom: '0px'}}>
          <h2>Frequently Asked Questions</h2>
          <div>
                  <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>How to get there?</Accordion.Header>
                        <Accordion.Body>
                          <p>
                        Buses bound for Carmen town or Sagbayan are available at the Dao Terminal in Tagbilaran City. Just ask the bus drivers to drop you off at the junctions leading to the resorts. In Carmen town, the road leading to the resort from the junction is only a 10-minute walk along a winding uphill road.
                          <br/>
                          <br/>
                          Vans are the most common means of transportation though, especially when traveling with a group. Aside from convenience and comfort, visitors can visit more places in a short span of time. Waiting for buses or public rides is time consuming.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="1">
                        <Accordion.Header>What are the best experiences near Chocolate Hills Natural Monument?</Accordion.Header>
                        <Accordion.Body>
                          <p>
                          The most popular attraction types near Chocolate Hills Natural Monument are:
                          <br/>
                          <br/>
                          • Nature & Wildlife Areas<br/>
                          • Lookouts<br/>
                          • Balloon Rides<br/>
                          • Zipline & Aerial Adventure Parks<br/>
                          • Points of Interest & Landmarks
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
 
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>What are the most popular things to do near Chocolate Hills Natural Monument?</Accordion.Header>
                        <Accordion.Body>
                          <p>
                          These are the best experiences near Chocolate Hills Natural Monument:
                          <br/>
                          <br/>
                          • Chocolate hills tour with Tarsier & Loboc river Buffet Lunch (half-day tour)<br/>
                          • Bohol Day Tour with Round-Trip Transfers from Cebu<br/>
                          • Bohol Countryside Day Tour from Cebu City or Mactan - Best Seller<br/>
                          • Bohol Countryside Day Tour From Cebu City | Lunch at Loboc River Cruise<br/>
                          • Chocolate hills Bohol Nature tour
                        </p>
                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey="3">
                        <Accordion.Header>How many Chocolate Hills are found in Bohol?</Accordion.Header>
                        <Accordion.Body>
                          <p>
                          There are about 1,260 Chocolate Hills in Bohol but it's also reported that they are as many as 1,776 Chocolate Hills scattered around an area of 50 square kilometers.
                        </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

Landingpage.propTypes = {
  getStatistics: PropTypes.func,
};

const mapStateToProps = (state) => ({
  vehiclesforstatistics: state.vehicles.vehiclesforstatistics,
  message: state.auth.message

});

export default connect(mapStateToProps, {getStatistics })(Landingpage);