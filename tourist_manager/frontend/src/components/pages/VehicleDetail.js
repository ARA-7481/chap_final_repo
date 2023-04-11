import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import withAuth from '../common/withAuth';

function VehicleDetail(props) {
  const { vehicle } = props;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{vehicle.plate_number}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vehicle.vehicle_classification}</Card.Subtitle>
        <Card.Text>
          Type: {vehicle.vehicle_type}
          <br />
          Passengers: {vehicle.passenger_count}
          <br />
          Description: {vehicle.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

VehicleDetail.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.vehicles.vehicle,
});

export default withAuth(connect(mapStateToProps)(VehicleDetail));