import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehiclestoday, deleteVehicles, getaVehicle, searchFail } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import withAuth from '../common/withAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//import '../../css/table.css'

function DailyqueueNoprint(props) {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedVehicleId, setHighlightedVehicleId] = useState(null);
  const handleSearch = () => {
    const matchingVehicle = props.filteredvehicles.find(
      (vehicle) =>
        vehicle.vehicle_id === searchQuery
    );
    if (matchingVehicle) {
      setHighlightedVehicleId(matchingVehicle.vehicle_id);
      props.getaVehicle(matchingVehicle.vehicle_id);
      navigate('/vehicledetailchecker');
    } else {
      props.searchFail();
      setHighlightedVehicleId(null);
    }
    
  };


  const handleRowClick = (vehicleId) => {
    props.getaVehicle(vehicleId);
    navigate('/vehicledetailchecker');
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
        <div className="table-container rounded" style={{maxHeight: '90vh', overflowY: 'auto', width: '100%', marginTop: '10px', marginRight: '100px', borderWidth: '3px'}}>
          <Table striped bordered hover variant="dark" style={{ opacity: 0.90 }}>
            <thead>
              <tr>
                <th className='align-middle'>Transaction Code</th>
                <th className='align-middle'>Plate Number</th>
                <th className='align-middle'>Description</th>
                <th className='align-middle'>Date</th>
                <th className='align-middle'>Time</th>
                <th className='align-middle'>Added By</th>
                <th className='align-middle'>Status</th>
                <th className='align-middle'>Check</th>
              </tr>
            </thead>
            <tbody>
              {props.filteredvehicles
                .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                ?.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}
                  className={vehicle.vehicle_id === highlightedVehicleId ? 'highlight' : ''}
                >
                    <td style={{width:'300px'}}>{vehicle.vehicle_id}</td>
                    <td style={{width:'300px'}}>{vehicle.plate_number}</td>
                    <td style={{width:'350px' ,maxWidth: '400px'}}>{vehicle.description}</td>
                    <td style={{width:'200px'}}>{vehicle.date}</td>
                    <td style={{width:'200px'}}>{vehicle.time}</td>
                    <td style={{width:'300px'}}>{vehicle.added_by}</td>
                    <td style={{width:'300px'}}>{vehicle.status}</td>
                    <td style={{width:'200px'}}>
                    <button
                        onClick={() => handleRowClick(vehicle.vehicle_id)}
                        className="btn btn-info btn-sm"
                      >
                        Check
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

DailyqueueNoprint.propTypes = {
  filteredvehicles: PropTypes.array.isRequired,
  getVehiclestoday: PropTypes.func.isRequired,
  deleteVehicles: PropTypes.func.isRequired,
  getaVehicle: PropTypes.func.isRequired,
  searchFail: PropTypes.func,
  isAutheticated: PropTypes.bool,
  search_message: PropTypes.string,
};

const mapStateToProps = (state) => ({
  filteredvehicles: state.vehicles.filteredvehicles,
  vehicle: state.vehicles.vehicle,
  isAutheticated: state.auth.isAutheticated,
  search_message: state.vehicles.search_message
});

export default withAuth(connect(mapStateToProps, { getVehiclestoday, deleteVehicles, getaVehicle, searchFail })(DailyqueueNoprint));