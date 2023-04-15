import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withAuth from '../common/withAuth';

function DataCard(props) {
  const { vehicleforstatistics } = props;

  // Handle the case where vehicleforstatistics is undefined
  if (!vehicleforstatistics) {
    return <div>Loading...</div>;
  }

  // Calculate the values to display
  let totalEarnings = 0;
  let totalDomesticGuests = 0;
  let totalLocalGuests = 0;
  let totalInternationalGuests = 0;
  let totalPassengers = 0;

  vehicleforstatistics.forEach((item) => {
    totalEarnings += item.total_bill || 0;
    totalDomesticGuests += item.passenger_count_domestic || 0;
    totalLocalGuests += item.passenger_count_local || 0;
    totalInternationalGuests += item.passenger_count_international || 0;
    totalPassengers += item.passenger_count || 0;
  });

  
  return (
    <div style={{ width: '900px', height: '800px', marginLeft: '50px', border: '1px solid #ccc' }}>
      <h2>Data Card</h2>
      <p>Total earnings: {totalEarnings}</p>
      <p>Total domestic guests: {totalDomesticGuests}</p>
      <p>Total local guests: {totalLocalGuests}</p>
      <p>Total international guests: {totalInternationalGuests}</p>
      <p>Total passengers: {totalPassengers}</p>
    </div>
  );
}

DataCard.propTypes = {
  vehicleforstatistics: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  vehicleforstatistics: state.vehicles.vehicleforstatistics,
});

export default withAuth(connect(mapStateToProps)(DataCard));