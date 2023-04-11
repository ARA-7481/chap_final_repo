import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehicles, deleteVehicles, getaVehicle } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import withAuth from '../common/withAuth';

import '../../css/table.css'

function Overview(props) {
  const navigate = useNavigate();

  const handleRowClick = (vehicleId) => {
    props.getaVehicle(vehicleId);
    navigate('/vehicledetail');
  };

  useEffect(() => {
    props.getVehicles();
  }, []);

  return (
    <Fragment>
      <h2>Vehicles</h2>
      <div className="table-container">
      <Table style={{ width: '120%' }} striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Transaction Code</th>
            <th>Plate Number</th>
            <th>Classification</th>
            <th>Type</th>
            <th>Passengers</th>
            <th>Description</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id} onClick={() => handleRowClick(vehicle.vehicle_id)}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.plate_number}</td>
              <td>{vehicle.vehicle_classification}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.passenger_count}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.date}</td>
              {/* ... */}
              <td>
                <button
                  onClick={() => props.deleteVehicles(vehicle.vehicle_id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </Fragment>
  );
}

Overview.propTypes = {
  vehicles: PropTypes.array.isRequired,
  getVehicles: PropTypes.func.isRequired,
  deleteVehicles: PropTypes.func.isRequired,
  getaVehicle: PropTypes.func.isRequired,
  isAutheticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicles.vehicles,
  vehicle: state.vehicles.vehicle,
  isAutheticated: state.auth.isAutheticated,
});

export default withAuth(connect(mapStateToProps, { getVehicles, deleteVehicles, getaVehicle })(Overview));