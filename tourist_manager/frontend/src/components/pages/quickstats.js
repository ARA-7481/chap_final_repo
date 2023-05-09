import React, { useState, useEffect  } from 'react';
import Calendar from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/calendar.css'
import { Card } from 'react-bootstrap';
import { setThedate, getStatistics } from '../../actions/vehicles';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuth from '../common/withAuth';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Vehicleform from './Vehicleform';
import Overview from './Overview';
import Dailyqueue from './Dailyqueue';
import Register from '../accounts/Reg';
import Rates from './Rates';
import Stafflist from './Stafflist';
import moment from 'moment/moment';

function Quickstats (props){
  const inputRef = React.useRef();

  let totalEarnings = 0;
  let totalDomesticGuests = 0;
  let totalLocalGuests = 0;
  let totalInternationalGuests = 0;
  let totalPassengers = 0;


  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('form');
  const [isHidden, setIsHidden] = useState(true);
  const [inputValue, setInputValue] = useState('');


  const onChange = date => {
    setDate(date);
  }
  
 

  props.vehiclesforstatistics.forEach((item) => {
    totalEarnings += item.total_bill || 0;
    totalDomesticGuests += item.passenger_count_domestic || 0;
    totalLocalGuests += item.passenger_count_local || 0;
    totalInternationalGuests += item.passenger_count_international || 0;
    totalPassengers += item.passenger_count || 0;
  });


  const onClick = (e) => {
    e.preventDefault();
    const dateSet = date.toLocaleDateString('en-CA')
    props.getStatistics(dateSet);
    console.log(dateSet);

  };
  
  const handleGetAllData = () => {
    const searchAll = ''
    props.getStatistics(searchAll);
  }

  const handleGetData = () => {
    // Parse the text entered in the input box as a date
    const parts = inputValue.split('-');
    const year = parts[0];
    const month = parts[1] ? parts[1] - 1 : 0;
    const date = new Date(year, month);
  
    // Format the date back to the yyyy or yyyy-mm format
    const format = parts[1] ? 'YYYY-MM' : 'YYYY';
    const formattedDate = moment(date).format(format);
    props.getStatistics(formattedDate);
  
    // You can now use formattedDate as a string in the yyyy or yyyy-mm format
    console.log(formattedDate);
  };


  useEffect(() => {
    props.getStatistics();
  }, []);
  

  return (
    <>
      <Card style={{ width: '95%' , height: '100%', marginLeft:'27px', marginRight: '0px', backgroundColor:'rgba(51, 51, 51, 0.85)'}}>
        <Navbar bg="dark" variant="dark">
          <Nav className="me-auto" activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Link eventKey="form">Data Summary</Nav.Link>
          </Nav>
        </Navbar>
      <Card.Body>
        {activeKey === 'form' && 
        <div>
        <h2 style={{color: 'white', marginBottom:'20px'}}>Summary of Tourist Visits</h2>
        <div style={{display: 'flex'}}>
        <h3 style={{color: 'white', marginBottom:'20px'}}>Total earnings:</h3>
        <h3 style={{color: 'yellow', marginBottom:'20px', marginLeft:'15px'}}>₱{totalEarnings}.00</h3>
        </div>
        <h5 style={{color: 'white', marginBottom:'15px'}}>Total domestic guests: {totalDomesticGuests}</h5>
        <h5 style={{color: 'white', marginBottom:'15px'}}>Total local guests: {totalLocalGuests}</h5>
        <h5 style={{color: 'white', marginBottom:'15px'}}>Total international guests: {totalInternationalGuests}</h5>
        <h5 style={{color: 'white', marginBottom:'15px'}}>Total number of guests: {totalPassengers}</h5>
        <div style={{marginTop:'40px'}}>
        <button className="btn btn-primary" style={{ width: '350px'}} onClick={() => setCalendarVisible(!calendarVisible)}>
          {calendarVisible ? 'Hide Calendar' : 'Get Day-Based Data'}
        </button>
          {calendarVisible && (
            <div className="calendar-container">
              <Calendar
                onChange={onChange}
                value={date}
              />
              <button onClick={onClick} type="submit" className="btn btn-primary mx-auto" style={{ width: '100px', height: '40px', marginLeft: '10px', marginTop: '5px', marginBottom: '5px' }}>Get Data</button>
          </div>
          )}
          </div>
          <div style={{marginTop:'1px'}}>
          <button className="btn btn-primary" style={{ width: '350px', marginTop: '10px'}} onClick={() => setIsHidden(!isHidden)}>{isHidden ? 'Get Month/Year-Based Data' : 'Hide'}</button>
          <br/>
          {!isHidden && (
        <>
          <input
            type="text"
            style={{ marginTop: '10px', width: '350px' }}
            placeholder="yyyy-mm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br/>
          <button
            onClick={handleGetData}
            type="submit"
            className="btn btn-primary mx-auto"
            style={{
              width: '100px',
              height: '40px',
              marginLeft: '10px',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            Get Data
          </button>
        </>
      )}
          </div>
          <div style={{marginTop:'1px'}}>
          <button 
          onClick={handleGetAllData}
          className="btn btn-primary" 
          style={{ width: '350px', marginTop: '10px'}}
          >
            Get All Data
            </button>
          </div>
          </div>


        }
      </Card.Body>
    </Card>
    </>
  );
}

Quickstats.propTypes = {
  dateforstatistics: PropTypes.string,
  setThedate: PropTypes.func.isRequired,
  getStatistics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dateforstatistics: state.vehicles.dateforstatistics,
  vehiclesforstatistics: state.vehicles.vehiclesforstatistics

});

export default withAuth(connect(mapStateToProps, { setThedate, getStatistics })(Quickstats));