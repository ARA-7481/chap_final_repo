import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addVehicle, getVehiclestoday, getRates, setRates } from '../../actions/vehicles';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import withAuth from '../common/withAuth';
//import '../../css/form.css'

function VehicleForm(props){
  const initialState = {
    plate_number: '',
    vehicle_classification: '',
    vehicle_type: '',
    passenger_count: '',
    description: 'None',
    added_by: '',
    passenger_count_domestic: '',
    passenger_count_local: '',
    passenger_count_international: '',
    total_bill: '',
  };
  const [formData, setFormData] = useState(initialState);

  const { plate_number, vehicle_classification, vehicle_type, passenger_count, description, passenger_count_domestic, passenger_count_local, passenger_count_international, total_bill } = formData;

  useEffect(() => {
    props.getRates();
    setFormData((prevState) => ({
      ...prevState,
      passenger_count: Number(passenger_count_domestic) + Number(passenger_count_local) + Number(passenger_count_international),
      total_bill: (Number(passenger_count_domestic)*Number(props.domestic_rate)) + (Number(passenger_count_local)*Number(props.local_rate)) + (Number(passenger_count_international)*Number(props.international_rate))
    }));
  }, [passenger_count_domestic, passenger_count_local, passenger_count_international, props.domestic_rate, props.local_rate, props.international_rate]);
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    // for example, dispatch an action to add the vehicle to the Redux store
    props.addVehicle(formData);
    setFormData(initialState);
  };

  return (
    <form onSubmit={onSubmit} className="p-3 rounded ml-auto mt-4" style={{ backgroundColor:'rgba(200, 211, 211, 0.5)' , border: '1px solid darkgray', width: '100%'}}>
      <div className = "container">
      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="plate_number" className="mr-2">Plate Number:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="plate_number"
          value={plate_number}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="vehicle_classification" className="mr-2">Classification:</label>
        <select
          className="form-control mb-2 d-block mx-auto"
          onChange={e => onChange({ target: { name: 'vehicle_classification', value: e.target.value } })}
          style={{width: '100%', margin: '5px'}}
        >
          <option value="">Select a Classification</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="vehicle_type" className="mr-2">Type:</label>
        <select
          className="form-control mb-2 d-block mx-auto"
          onChange={e => onChange({ target: { name: 'vehicle_type', value: e.target.value } })}
          style={{width: '100%', margin: '5px'}}
        >
          <option value="">Select a Type</option>
          <option value="bus">Bus</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="pick-up">Pick-up</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
          <option value="others">Others</option>
        </select>
      </div>


      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="passenger_count_domestic" className="mr-2">Domestic:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_domestic"
          value={passenger_count_domestic}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="passenger_count_local" className="mr-2">Local:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_local"
          value={passenger_count_local}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left"style={{marginBottom: '10px'}}>
        <label htmlFor="passenger_count_international" className="mr-2">International:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_international"
          value={passenger_count_international}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="passenger_count" className="mr-2">Total Passengers:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count"
          value={passenger_count}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="total_bill" className="mr-2">Total Bill:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="total_bill"
          value={total_bill}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>

      <div className="form-group text-left" style={{marginBottom: '10px'}}>
        <label htmlFor="description" className="mr-2">Description:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="description"
          value={description}
          onChange={onChange}
          style={{width: '100%', margin: '5px'}}
        />
      </div>
      <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
      </div>
       </form>
  );
};

VehicleForm.propTypes = {
  setRates: PropTypes.func.isRequired,
  getRates: PropTypes.func.isRequired,
  local_rate: PropTypes.number,
  domestic_rate: PropTypes.number,
  international_rate: PropTypes.number,
  getVehiclestoday: PropTypes.func,
  addVehicle: PropTypes.func
};

const mapStateToProps = (state) => ({
  local_rate: state.vehicles.local_rate,
  domestic_rate: state.vehicles.domestic_rate,
  international_rate: state.vehicles.international_rate,
});

export default withAuth(connect(mapStateToProps, {getVehiclestoday, addVehicle, getRates, setRates})(VehicleForm));