import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addVehicle, getVehiclestoday } from '../../actions/vehicles';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehicleForm = (props) => {
  const initialState = {
    plate_number: '',
    vehicle_classification: '',
    vehicle_type: '',
    passenger_count: '',
    description: '',
    added_by: '',
    passenger_count_domestic: '',
    passenger_count_local: '',
    passenger_count_international: '',
    total_bill: '',
  };
  const [formData, setFormData] = useState(initialState);

  const { plate_number, vehicle_classification, vehicle_type, passenger_count, description, passenger_count_domestic, passenger_count_local, passenger_count_international, total_bill } = formData;

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      passenger_count: Number(passenger_count_domestic) + Number(passenger_count_local) + Number(passenger_count_international),
    }));
  }, [passenger_count_domestic, passenger_count_local, passenger_count_international]);
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    // for example, dispatch an action to add the vehicle to the Redux store
    props.addVehicle(formData);
    props.getVehiclestoday();
    setFormData(initialState);
  };

  return (
    <form onSubmit={onSubmit} className="p-3 rounded mx-auto mt-4" style={{background: 'white', border: '1px solid darkgray', padding: '20px', width: '100%'}}>
      <div className="form-group text-center">
        <label htmlFor="plate_number" className="mr-2">Plate Number:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="plate_number"
          value={plate_number}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="vehicle_classification" className="mr-2">Classification:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="vehicle_classification"
          value={vehicle_classification}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="vehicle_type" className="mr-2">Type:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="vehicle_type"
          value={vehicle_type}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="passenger_count_domestic" className="mr-2">Domestic:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_domestic"
          value={passenger_count_domestic}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="passenger_count_local" className="mr-2">Local:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_local"
          value={passenger_count_local}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="passenger_count_international" className="mr-2">International:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count_international"
          value={passenger_count_international}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="passenger_count" className="mr-2">Passengers:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="passenger_count"
          value={passenger_count}
          onChange={onChange}
          style={{width: '70%'}}
          readOnly
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="total_bill" className="mr-2">Total Bill:</label>
        <input
          type="number"
          className="form-control mb-2 d-block mx-auto"
          name="total_bill"
          value={total_bill}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>

      <div className="form-group text-center">
        <label htmlFor="description" className="mr-2">Description:</label>
        <input
          type="text"
          className="form-control mb-2 d-block mx-auto"
          name="description"
          value={description}
          onChange={onChange}
          style={{width: '70%'}}
        />
      </div>
      <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
    </form>
  );
};

const mapDispatchToProps = {
  addVehicle,
  getVehiclestoday
};

export default connect(null, mapDispatchToProps)(VehicleForm);