import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehiclestoday} from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import withAuth from '../common/withAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//import '../../css/table.css'

function DailyqueuePrintPreview(props) {

  let totalEarnings = 0;
  let totalDomesticGuests = 0;
  let totalLocalGuests = 0;
  let totalInternationalGuests = 0;
  let totalPassengers = 0;

  props.filteredvehicles.forEach((item) => {
    totalEarnings += item.total_bill || 0;
    totalDomesticGuests += item.passenger_count_domestic || 0;
    totalLocalGuests += item.passenger_count_local || 0;
    totalInternationalGuests += item.passenger_count_international || 0;
    totalPassengers += item.passenger_count || 0;
  });

  useEffect(() => {
    props.getVehiclestoday();
  }, []);


  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="table-container rounded" style={{maxHeight: '90vh', overflowY: 'auto', width: '100%', marginTop: '10px', marginRight: '0px', borderWidth: '3px'}}>
        <h2 style={{ color: 'black', marginBottom: '20px' }}> Daily Sales Report </h2>
          <Table bordered style = {{color: 'black', backgroundColor:'rgba(200, 200, 200, 0.90)'}}>
            <thead>
              <tr>
                <th className='align-middle'>Transaction Code</th>
                <th className='align-middle'>Local Tourists</th>
                <th className='align-middle'>Local Tourists</th>
                <th className='align-middle'>Local Tourists</th>
                <th className='align-middle'>Total Tourists</th>
                <th className='align-middle'>Amount Collected</th>
                <th className='align-middle'>Notes</th>
              </tr>
            </thead>
            <tbody>
              {props.filteredvehicles
                .sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`))
                ?.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}>
                    <td style={{width:'300px'}}>{vehicle.vehicle_id}</td>
                    <td>{vehicle.passenger_count_local}</td>
                    <td>{vehicle.passenger_count_domestic}</td>
                    <td>{vehicle.passenger_count_international}</td>
                    <td>{vehicle.passenger_count}</td>
                    <td>{vehicle.total_bill}</td>
                    <td style={{width:'350px' ,maxWidth: '400px'}}>{vehicle.description}</td>
                  </tr>
                 
                ))}
                 <tr style={{backgroundColor: 'yellow'}}>

                    <td style={{width:'300px'}}>Total</td>
                    <td>{totalLocalGuests}</td>
                    <td>{totalDomesticGuests}</td>
                    <td>{totalInternationalGuests}</td>
                    <td>{totalPassengers}</td>
                    <td>{totalEarnings}</td>
                    <td style={{width:'350px' ,maxWidth: '400px'}}>  </td>

                 </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

DailyqueuePrintPreview.propTypes = {
  filteredvehicles: PropTypes.array.isRequired,
  getVehiclestoday: PropTypes.func.isRequired,
  isAutheticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  filteredvehicles: state.vehicles.filteredvehicles,
  vehicle: state.vehicles.vehicle,
  isAutheticated: state.auth.isAutheticated,
});

export default withAuth(connect(mapStateToProps, { getVehiclestoday })(DailyqueuePrintPreview));