import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import withAuth from '../common/withAuth';
import Barcode from 'react-barcode';
import { useNavigate } from 'react-router-dom';
import { setStatus, unsetStatus } from '../../actions/vehicles';

import BG from '../../assets/images/hero_img_1.png'
import cardBG from '../../assets/images/logofaded.png'
import logonew from '../../assets/images/LOGO.jpg'

function VehicleDetailChecker(props) {
  const navigate = useNavigate();
  const { vehicle } = props;

  const handleCheck = () => {
    props.setStatus(vehicle.vehicle_id);
    navigate('/checker');
    
  };
  const handleUnCheck = () => {
    props.unsetStatus(vehicle.vehicle_id);
    navigate('/checker');
  };

  return (
    /*<Card className="mx-auto" style={{ width: "500px" , backgroundImage:`url(${cardBG})`, backgroundSize: 'contain',
    backgroundPosition: 'center',
    }}>*/
    <>
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
    <Card className="mx-auto" style={{ width: "500px", marginTop: '30px'}}>
        <h2 style={{margin:'auto'}}>Status: {vehicle.status} </h2>
          <button
            onClick={handleCheck}
            className="btn btn-primary"
            style={{ width: '150px', margin: 'auto', backgroundColor: 'rgba(0, 139, 0, 0.5)', borderColor: 'rgba(0, 139, 0)'}}
          >
            Check
          </button>
          <button
            onClick={handleUnCheck}
            className="btn btn-primary"
            style={{ width: '150px', margin: 'auto', marginTop: '15px', marginBottom: '10px', backgroundColor: 'rgba(139, 0, 0, 0.5)', borderColor: 'rgba(139, 0, 0)'}}
          >
            Undo Check
          </button>
        </Card>
    </>
  );
}

VehicleDetailChecker.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.vehicles.vehicle,
});

export default withAuth(connect(mapStateToProps, { setStatus, unsetStatus})(VehicleDetailChecker));