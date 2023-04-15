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
      <div style={{ width: '120%', marginLeft:'1px' }}>
      <h2 className="text-center">Vehicles</h2>
      <div className="d-flex justify-content-center">
      <div className="table-container" style={{width: '100%'}}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Transaction Code</th>
            <th>Plate Number</th>
            <th>Classification</th>
            <th>Type</th>
            <th>Passengers</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {props.vehicles.sort((a, b) => new Date(b.date) - new Date(a.date)).map((vehicle) => (
            <tr key={vehicle.vehicle_id} onClick={() => handleRowClick(vehicle.vehicle_id)}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.plate_number}</td>
              <td>{vehicle.vehicle_classification}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.passenger_count}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.date}</td>
              <td>{vehicle.time}</td>
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
      </div>
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