import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import withAuth from '../common/withAuth';

import BG from '../../assets/images/hero_img_1.png'
import cardBG from '../../assets/images/logofaded.png'

function VehicleDetail(props) {
  const { vehicle } = props;

  return (
    <Card className="mx-auto" style={{ width: "1200px" , backgroundImage:`url(${cardBG})`, backgroundSize: 'contain',
    backgroundPosition: 'center',
    }}>
      <Card.Body>
        <Card.Title className="text-center" style={{ fontSize: '35px', margin: '0px' }}>Transaction Receipt</Card.Title>
        <h5 style={{marginTop: '0px'}} className="text-center">Chocolate Hills Management</h5>
        <h6 className="text-center">Carmen, Bohol, Philippines</h6>
        <Card.Subtitle className="mb-2 text-muted text-center">Ref. No. {vehicle.vehicle_id}</Card.Subtitle>
        <h4 style={{marginTop: '50px'}}>Vehicle Details</h4>
        <Card.Text style={{ fontSize: '18px'}}>
          <div style={{ display: 'flex'}}>
          <div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{color:'GrayText'}}>
          Transaction Date & Time: </div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.date}  {vehicle.time}
          </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Plate Number: </div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.plate_number} 
          </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Type:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.vehicle_classification} 
          </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Vehicle:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.vehicle_type}
          </div>
          </div>

          </div>

          <div style={{ marginLeft: '500px'}}>
          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Local Guests:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.passenger_count_local} 
          </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Domestic Guests:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.passenger_count_domestic} 
          </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          International Guests:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.passenger_count_international} 
          </div>
          </div>
  
          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Total Passengers:</div>
          <div style={{ marginLeft: '8px' }}>
          {vehicle.passenger_count} 
          </div>
          </div>
          

          </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'text-start' }}>
          <div style={{color:'GrayText'}}>
          Description:</div>
          <div style={{ marginLeft: '8px', width: '600px', wordWrap: 'break-word' }}>
          {vehicle.description}
          </div>
          </div>

          <div style={{ display: 'flex', marginLeft:'850px', alignItems:'center' }}>
          <div style={{color:'GrayText'}}>
          Amount Payable:</div>
          <div style={{ marginLeft: '15px', fontSize: '30px'}}>
          ₱{vehicle.total_bill}.00
          </div>
          </div>

          <div style={{ display: 'flex', marginLeft:'850px', alignItems:'center' }}>
          <div style={{color:'GrayText'}}>
          Processed By:</div>
          <div style={{ marginLeft: '15px', fontSize: '20px'}}>
          {vehicle.added_by}
          </div>
          </div>
           
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