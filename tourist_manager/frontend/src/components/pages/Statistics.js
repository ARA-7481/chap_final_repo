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


import Table from 'react-bootstrap/Table';

function Statistics (props){
  const inputRef = React.useRef();

  let totalEarnings = 0;
  let totalDomesticGuests = 0;
  let totalLocalGuests = 0;
  let totalInternationalGuests = 0;
  let totalPassengers = 0;


  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
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
    const inputValue = inputRef.current.value;
    props.getStatistics(inputValue);
    console.log(inputValue);
    //navigate('/datacard');

  };

  useEffect(() => {
    props.getStatistics();
  }, []);
  

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Card style={{ width: '323px', height: '400px', border: "none" }}>
          <input ref={inputRef} style={{ width: '350px'}} type="text" placeholder="Enter text here" value={inputValue} />
          <button style={{ width: '350px'}} onClick={() => setCalendarVisible(!calendarVisible)}>
            {calendarVisible ? 'Hide Calendar' : 'Show Calendar'}
          </button>
          {calendarVisible && (
            <div className="calendar-container">
              <Calendar
                onChange={onChange}
                value={date}
              />
              <button type="submit" className="btn btn-primary" onClick={() => setInputValue(date.toLocaleDateString('en-CA'))}>Fill</button>
            </div>
          )}
        </Card>
        <Card style={{ width: '900px' , height: '800px', marginLeft:'50px'}}>
        <button onClick={onClick} type="submit" className="btn btn-primary" style={{ width: '100px', height: '40px', marginLeft: '10px', marginTop: '10px' }}>Get Data</button>
        <div style={{ width: '900px', height: '800px', marginLeft: '50px', border: '1px solid #ccc' }}>
        <h2>Data Card</h2>
        <p>Total earnings: {totalEarnings}</p>
        <p>Total domestic guests: {totalDomesticGuests}</p>
        <p>Total local guests: {totalLocalGuests}</p>
        <p>Total international guests: {totalInternationalGuests}</p>
        <p>Total passengers: {totalPassengers}</p>
    </div>
        </Card>
      </div>
    </>
  );
}

Statistics.propTypes = {
  dateforstatistics: PropTypes.string.isRequired,
  setThedate: PropTypes.func.isRequired,
  getStatistics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dateforstatistics: state.vehicles.dateforstatistics,
  vehiclesforstatistics: state.vehicles.vehiclesforstatistics

});

export default withAuth(connect(mapStateToProps, { setThedate, getStatistics })(Statistics));