/* Here is: the new table form for reporting */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import withAuth from '../common/withAuth';

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

function Reporting(props) {

  let totalEarning = 0;
  let totalDomesticBill = 0;
  let totalLocalBill = 0;
  let totalInternationalBill = 0;



  props.vehiclesforstatisticsreport.forEach((item) => {
    totalDomesticBill += item.domesticTourists || 0;
    totalLocalBill += item.localTourists || 0;
    totalInternationalBill += item.internationalTourists || 0;
    
  });
  totalEarning = totalDomesticBill + totalLocalBill + totalInternationalBill

    useEffect(() => {
      }, []);
    
  return (
    <div className="d-flex justify-content-center">
      <div
        className="table-container rounded"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
          width: '100%',
          marginTop: '10px',
          marginLeft: '20px',
          marginRight: '20px',
          borderWidth: '3px',
        }}
      >
        <h2 style={{ color: 'black', marginBottom: '20px' }}> Annual Sales Report </h2>
        <Table bordered style = {{color: 'white', backgroundColor:'rgba(51, 51, 51, 0.35)'}}> 
          <thead>
            <tr>
              <th>Month</th>
              <th>Local Tourists</th>
              <th>Domestic Tourists</th>
              <th>International Tourists</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {props.vehiclesforstatisticsreport.map((monthData, index) => (
              <tr key={index}>
              <td>{monthNames[index]}</td>
              <td> ₱{monthData.localTourists}</td>
              <td> ₱{monthData.domesticTourists}</td>
              <td> ₱{monthData.internationalTourists}</td>
              <td> ₱{monthData.internationalTourists + monthData.domesticTourists + monthData.localTourists}</td>
            </tr>
            ))}
            <tr style={{backgroundColor: 'green'}}>

              <td> </td>
              <td>{totalLocalBill}</td>
              <td>{totalDomesticBill}</td>
              <td>{totalInternationalBill}</td>
              <td>{totalEarning}</td>
              </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

Reporting.propTypes = {
  vehiclesforstatisticsreport: PropTypes.array,
};

const mapStateToProps = (state) => ({
  vehiclesforstatisticsreport: state.vehicles.vehiclesforstatisticsreport,
});

export default withAuth(connect(mapStateToProps)(Reporting));