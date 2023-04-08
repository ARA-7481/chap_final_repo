import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehicles } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';

export class Overview extends Component {
    static propTypes = {
        vehicles: PropTypes.array.isRequired
    };
    componentDidMount(){
        this.props.getVehicles();
    }

  render() {
    return (
        <Fragment>
        <div>
        <h1>Vehicles</h1>
        </div>
        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
    vehicles: state.vehicles.vehicles
});

export default connect(mapStateToProps, {getVehicles})(Overview);