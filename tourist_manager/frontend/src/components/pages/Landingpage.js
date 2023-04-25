import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import { getStatistics } from '../../actions/vehicles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    <div className='landing_page'>
      {/* Hero */}
      <section id='hero' style={{backgroundImage:`url(${BG})`, backgroundSize: 'cover', width:'145%', marginRight:'0px', marginLeft:'0px'}}>
        <div className='container' >
        
          <h1>
            <span className='label'>AS OF TODAY:</span>
            <br/>
            <span>{totalPassengers} </span>
            GUESTS VISITED
          </h1>
          
          <p>Bohol's most famous tourist attraction is a sight to behold. The stories and facts behind it are what make these more interesting for travelers who visit them in Bohol.</p>
        
          <div className='background-images'>
            <div id='bg-1'>
              <div className='overlay'></div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id='about' style={{width:'100%', marginTop:'0px'}}>
        <div className='container'>
          <img src={AboutPhoto} alt='Photo' />

          <div>
            <h2>About Chocolate Hills</h2>
            <p>
              Known for its uniquely shaped group of hills, Chocolate Hills offers an extraordinary landscape on the island of Bohol. Because of this, it has earned a spot as the “Eighth Wonder of the World.” Chocolate Hills have estimated thousands of hills spread across the towns of Carmen, Sagbayan, and Batuan. It covers roughly an area of 50 square kilometers, with each hill varying in size—from 100 up to 395 feet tall.
              <br/>
              <br/>
              Aside from its Hershey’s Kisses-like symmetry, the name “Chocolate Hills” roots from its changing color depending on the season. During the rainy season, the hills offer a majestic green color from their grass. But during the dry season, they uniformly turn into a brown color mimicking that of chocolate.
            </p>
          </div>
        </div>
      </section>

      {/* What Can You Do */}
      <section id='what_can_you_do' style={{width:'145%', marginBottom:'10px'}}>
        <div className='container'>
          <h2>What can you do with Chocolate Hills Adventure Park</h2>

          <div>
            {/* 1 */}
            <div>
              <img src={WCYD1} alt='BIKE ZIPLINE' />

              <div>
                <h3>“THE RUSH” BIKE ZIPLINE</h3>
                <p>Bike your way midair and get a breath-taking 360-degree view of the Chocolate Hills. Fear not, because this 550-meter long round-trip bike zip is secured with the use of state-of-the-art safety equipment. The first of its kind in Bohol, feel the southern breeze against your face as you pedal your way 150-feet above the most picturesque view of the Chocolate Hills.</p>
              </div>
            </div>

            {/* 2 */}
            <div>
              <img src={WCYD2} alt='SURF ZIPLINE' />

              <div>
                <h3>“The Rush” Bike Zipline</h3>
                <p>The first and only surfing zipline in Asia and maybe in the world. Enjoy surfing over the hills on a surfboard. Imagine yourself hovering 230 ft high, in Hawaiian shirt and lei as you weave through the hills and view the magnificent Chocolate Hills just as if you were surfing the waves in Maui.</p>
              </div>
            </div>

            {/* 3 */}
            <div>
              <img src={WCYD3} alt='ATV RENTAL' />

              <div>
                <h3>ATV RENTAL</h3>
                <p>Hit the trails by going on a Bohol ATV ride! You can either choose a guided tour or simply rent an ATV for this exhilarating experience.<br/><br/>Travelers will be given a quick orientation about how to control the ATV and be taught safety guidelines, and they would need to sign a waiver before hitting the terrain.</p>
              </div>
            </div>

            {/* 4 */}
            <div>
              <img src={WCYD4} alt='ECO-HIKING TRAIL' />

              <div>
                <h3>ECO-HIKING TRAIL</h3>
                <p>For the nature lovers, CHAP is a luscious green haven where in you can be one with Mother Nature. A 2-hour hiking trail is laid out near the outskirts of the park for a more awe-inspiring view of the picturesque vista. While trekking your way up and down, you will see some wild orchids and strangler trees, and even encounter millipedes, tree frogs, fresh water crabs, black-nape oriole, jungle fowl, and other fauna.</p>
              </div>
            </div>

            {/* 5 */}
            <div>
              <img src={WCYD5} alt='CAMPING' />

              <div>
                <h3>CAMPING</h3>
                <p>If you want to be close with nature, camping atop this grassy limestone hills would complete your adventure. Experience oneness with nature as you camp underneath the stars, wake up to the sounds of birds, and see the Chocolate Hills at their best during sunrise.</p>
              </div>
            </div>

            {/* 6 */}
            <div>
              <img src={WCYD6} alt='SPIDERMAN WALL CLIMBING' />

              <div>
                <h3>SPIDERMAN WALL CLIMBING</h3>
                <p>Be like Spiderman and enjoy a challenging climb up the Wall. Bobble and weave your way up to the top and ring the bell.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id='faqs' style={{width:'145%', marginTop:'10px'}}>
        <div className='container'>
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
  );
}

Landingpage.propTypes = {
  getStatistics: PropTypes.func,
};

const mapStateToProps = (state) => ({
  vehiclesforstatistics: state.vehicles.vehiclesforstatistics

});

export default connect(mapStateToProps, {getStatistics })(Landingpage);