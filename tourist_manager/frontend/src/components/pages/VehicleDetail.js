import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import withAuth from '../common/withAuth';
import Barcode from 'react-barcode';

import BG from '../../assets/images/hero_img_1.png'
import cardBG from '../../assets/images/logofaded.png'
import logonew from '../../assets/images/LOGO.jpg'

function VehicleDetail(props) {
  const { vehicle } = props;

  return (
    /*<Card className="mx-auto" style={{ width: "500px" , backgroundImage:`url(${cardBG})`, backgroundSize: 'contain',
    backgroundPosition: 'center',
    }}>*/
    <Card className="mx-auto" style={{ width: "500px"}}>
      <Card.Body>
        <div style={{ display: 'flex'}}>
        <div>
        <img src={logonew} alt="logo" style={{width: '180px', height: '180px', marginRight: '15px'}}/>
        </div>
        <div style={{marginLeft: '10px'}}>
        <Card.Title className="text-center" style={{ fontSize: '28px', marginTop: '15px' }}>Province of Bohol</Card.Title>
        <h4 style={{marginTop: '15px'}} className="text-center">Municipality of Carmen</h4>
        <h5 className="text-center" style={{marginTop: '15px'}}>Chocolate Hills Complex</h5>
        </div>
        </div>
        <hr />
        <h2 className="text-center" style={{marginTop: '20px'}}>Entrance Receipt</h2>
        <h3 className="text-center">{vehicle.date}</h3>
        <Card.Subtitle className="mb-2 text-muted text-center">Ref. No. {vehicle.vehicle_id}</Card.Subtitle>
        <hr />
        <h3 style={{marginTop: '50px'}}>{vehicle.time}</h3>
        <h4 style={{marginTop: '10px'}}>Local Tourists: {vehicle.passenger_count_local}</h4>
        <h4 style={{marginTop: '10px'}}>Domestic Tourists: {vehicle.passenger_count_domestic}</h4>
        <h4 style={{marginTop: '10px'}}>International Tourists: {vehicle.passenger_count_international}</h4>
        <Card.Text style={{ fontSize: '18px'}}>
        <h2 style={{marginTop: '30px', marginBottom: '30px'}}>PAID: ₱{vehicle.total_bill}.00</h2>
        <hr />
        </Card.Text>
        <Barcode value={vehicle.vehicle_id} />;
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