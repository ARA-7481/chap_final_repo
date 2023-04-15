import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehiclestoday, deleteVehicles, getaVehicle } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import withAuth from '../common/withAuth';

//import '../../css/table.css'

function Dailyqueue(props) {

  const navigate = useNavigate();

  const handleRowClick = (vehicleId) => {
    props.getaVehicle(vehicleId);
    navigate('/vehicledetail');
  };
  useEffect(() => {
    props.getVehiclestoday();
  }, [props.filteredvehicles]);


  return (
    <Fragment>
      <h2 className="text-center">Vehicles Today</h2>
      <div className="d-flex justify-content-center">
        <div className="table-container" style={{maxHeight: '40vh', overflowY: 'auto', width: '100%', marginLeft:'1px' }}>
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th>Transaction Code</th>
                <th>Plate Number</th>
                <th>Classification</th>
                <th>Type</th>
                <th>Domestic</th>
                <th>Local</th>
                <th>International</th>
                <th>Total Guests</th>
                <th>Total Bill</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Inspect</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.filteredvehicles
                .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                ?.map((vehicle) => (
                  <tr
                  >
                    <td>{vehicle.vehicle_id}</td>
                    <td>{vehicle.plate_number}</td>
                    <td>{vehicle.vehicle_classification}</td>
                    <td>{vehicle.vehicle_type}</td>
                    <td>{vehicle.passenger_count_domestic}</td>
                    <td>{vehicle.passenger_count_local}</td>
                    <td>{vehicle.passenger_count_international}</td>
                    <td>{vehicle.passenger_count}</td>
                    <td>{vehicle.total_bill}</td>
                    <td>{vehicle.description}</td>
                    <td>{vehicle.date}</td>
                    <td>{vehicle.time}</td>

                    <td>
                    <button
                        onClick={() => handleRowClick(vehicle.vehicle_id)}
                        className="btn btn-info btn-sm"
                      >
                        Inspect
                      </button>
                    </td>
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
    </Fragment>
  );
}

Dailyqueue.propTypes = {
  filteredvehicles: PropTypes.array.isRequired,
  getVehiclestoday: PropTypes.func.isRequired,
  deleteVehicles: PropTypes.func.isRequired,
  getaVehicle: PropTypes.func.isRequired,
  isAutheticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  filteredvehicles: state.vehicles.filteredvehicles,
  vehicle: state.vehicles.vehicle,
  isAutheticated: state.auth.isAutheticated,
});

export default withAuth(connect(mapStateToProps, { getVehiclestoday, deleteVehicles, getaVehicle })(Dailyqueue));