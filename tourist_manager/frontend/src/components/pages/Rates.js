import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getRates, setRates } from '../../actions/vehicles';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { getVehicles, deleteVehicles, getaVehicle } from '../../actions/vehicles';
import withAuth from '../common/withAuth';
//import '../../css/form.css'

function Rates(props){
    const initialState = {
        domestic_rate: '',
        local_rate: '',
        international_rate: ''
      }
  const [formData, setFormData] = useState(initialState);
  const { domestic_rate, local_rate, international_rate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.setRates(formData);
  };

  useEffect(() => {
    props.getRates();
  }, []);

  return (
    <div className='container' style={{marginLeft:'1px'}}>
    <div style={{display: 'flex'}}>
    <h2 style={{color: 'white', marginBottom:'20px'}}>Entrance Fees</h2>
    </div>
    <div style={{display: 'flex'}}>
    <h3 style={{color: 'white', marginBottom:'20px'}}>Current Domestic Tourist Rate:</h3>
    <h3 style={{color: 'yellow', marginBottom:'20px', marginLeft:'25px'}}>₱{props.domestic_rate}.00</h3>
    </div>
    <div style={{display: 'flex'}}>
    <h3 style={{color: 'white', marginBottom:'20px'}}>Current Local Tourist Rate:</h3>
    <h3 style={{color: 'yellow', marginBottom:'20px', marginLeft:'25px'}}>₱{props.local_rate}.00</h3>
    </div>
    <div style={{display: 'flex'}}>
    <h3 style={{color: 'white', marginBottom:'20px'}}>Current Foreigner Tourist Rate:</h3>
    <h3 style={{color: 'yellow', marginBottom:'20px', marginLeft:'25px'}}>₱{props.international_rate}.00</h3>
    </div>
    <form onSubmit={onSubmit} className="p-3 rounded" style={{background: 'white', border: '1px solid darkgray', width: '30%', marginTop:'60px', marginLeft:'1px'}}>
      <div className = "container">

      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="domestic_rate" className="mr-2">Domestic Rate:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="domestic_rate"
          value={domestic_rate}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="local_rate" className="mr-2">Local Rate:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="local_rate"
          value={local_rate}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="international_rate" className="mr-2">International Rate:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="international_rate"
          value={international_rate}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <button type="submit" className="btn btn-primary d-block mx-auto">Submit New Rates</button>
      </div>
       </form>
       </div>
  );
};

Rates.propTypes = {
    setRates: PropTypes.func.isRequired,
    getRates: PropTypes.func.isRequired,
    local_rate: PropTypes.number,
    domestic_rate: PropTypes.number,
    international_rate: PropTypes.number
  };
  
const mapStateToProps = (state) => ({
    local_rate: state.vehicles.local_rate,
    domestic_rate: state.vehicles.domestic_rate,
    international_rate: state.vehicles.international_rate,
  });

  export default withAuth(connect(mapStateToProps, { getRates, setRates})(Rates));