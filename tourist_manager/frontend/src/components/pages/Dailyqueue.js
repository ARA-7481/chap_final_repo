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

  const handleDelete = (vehicleId) => {
    props.deleteVehicles(vehicleId);
    props.getVehiclestoday();
  };

  useEffect(() => {
    props.getVehiclestoday();
  }, []);


  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="table-container rounded" style={{maxHeight: '85vh', overflowY: 'auto', width: '150vh', marginTop: '10px', marginRight: '20px'}}>
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th className='align-middle'>Transaction Code</th>
                <th className='align-middle'>Plate Number</th>
                <th className='align-middle'>Classification</th>
                <th className='align-middle'>Type</th>
                <th className='align-middle'>Domestic</th>
                <th className='align-middle'>Local</th>
                <th className='align-middle'>International</th>
                <th className='align-middle'>Total Guests</th>
                <th className='align-middle'>Total Bill</th>
                <th className='align-middle'>Description</th>
                <th className='align-middle'>Date</th>
                <th className='align-middle'>Time</th>
                <th className='align-middle'>Added By</th>
                <th className='align-middle'>Inspect</th>
                <th className='align-middle'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.filteredvehicles
                .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                ?.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}
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
                    <td style={{maxWidth: '250px'}}>{vehicle.description}</td>
                    <td>{vehicle.date}</td>
                    <td>{vehicle.time}</td>
                    <td>{vehicle.added_by}</td>

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
                        onClick={() => handleDelete(vehicle.vehicle_id)}
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