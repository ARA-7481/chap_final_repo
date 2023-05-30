import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehicles, deleteVehicles, getaVehicle, searchFail } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import withAuth from '../common/withAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../../css/table.css'

function Overview(props) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedVehicleId, setHighlightedVehicleId] = useState(null);

  const handleSearch = () => {
    const matchingVehicle = props.vehicles.find(
      (vehicle) =>
        vehicle.vehicle_id === searchQuery
    );
    if (matchingVehicle) {
      setHighlightedVehicleId(matchingVehicle.vehicle_id);
      props.getaVehicle(matchingVehicle.vehicle_id);
      navigate('/vehicledetail');
    } else {
      props.searchFail();
      setHighlightedVehicleId(null);
    }
    
  };

  const handleRowClick = (vehicleId) => {
    props.getaVehicle(vehicleId);
    navigate('/vehicledetail');
  };
  
  useEffect(() => {
    props.getVehicles();
  }, []);

  return (
    <Fragment>
      <div style={{ display: 'flex', width: '30%', alignItems: 'flex-start' }}>
      <Form.Control
        type='search'
        placeholder='Search by transaction code'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{width: '310px', marginRight:'10px'}}
      />
      <Button onClick={handleSearch}>Find</Button>

      {props.search_message === 'Failed' && (
          <Alert
          variant="danger"
         
          style={{
            width: '345px',
            position: 'absolute',
            top: '20%',
            left: '30%',
            transform: 'translate(-15%, -50%)',
            zIndex: 9999,
          }}
        >
          Transaction Not Found!
        </Alert>
      )};


      </div>
      <div className="d-flex justify-content-center">
        <div className="table-container rounded" style={{maxHeight: '90vh', overflowY: 'auto', width: '100%', marginTop: '0px', marginRight: '0px', marginLeft: '0px'}}>
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
              </tr>
            </thead>
            <tbody>
              {props.vehicles
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
                    <td style={{width:'350px' ,maxWidth: '400px'}}>{vehicle.description}</td>
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
                  </tr>
                ))}
            </tbody>
          </Table>
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
  search_message: PropTypes.string,
  searchFail: PropTypes.func,
};

const mapStateToProps = (state) => ({
  vehicles: state.vehicles.vehicles,
  vehicle: state.vehicles.vehicle,
  isAutheticated: state.auth.isAutheticated,
  search_message: state.vehicles.search_message
});

export default withAuth(connect(mapStateToProps, { getVehicles, deleteVehicles, getaVehicle, searchFail })(Overview));