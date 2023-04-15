import axios from "axios";
import { GET_STATISTICS, VEHICLE_ADDED, VEHICLEADD_FAIL, GET_VEHICLES, GET_VEHICLESTODAY, DELETE_VEHICLE, GETA_VEHICLE, UNGETA_VEHICLE, UNDELETE, SET_DATE } from "./types";
import { tokenConfig } from './auth';
import { returnErrors } from './messages';

//GET VEHICLES
export const getVehicles = () => (dispatch, getState) => {
    axios.get('/api/vehicle', tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GET_VEHICLES,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

export const getVehiclestoday = () => (dispatch, getState) => {
    axios.get(`/api/vehicle`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GET_VEHICLESTODAY,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

export const deleteVehicles = (id) => (dispatch, getState) => {
    axios
      .delete(`/api/vehicle/${id}/`, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ deleteVehicles: 'Vehicle Deleted' }));
        dispatch({
          type: DELETE_VEHICLE,
          payload: id,
        });
      })
      .catch((err) => console.log(err));
  };

export const getaVehicle = (id) => (dispatch, getState) => {
    axios.get(`/api/vehicle/${id}/`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GETA_VEHICLE,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

export const ungetaVehicle = (id) => (dispatch, getState) => {
        dispatch({
            type: UNGETA_VEHICLE,
            payload: null
        })
};

export const unDelete = (id) => (dispatch, getState) => {
    dispatch({
        type: UNDELETE,
        payload: null
    })
};

//Post

export const addVehicle = (formData) => (dispatch, getState) => {
    const body = JSON.stringify({ 
        ...formData,
        passenger_count: Number(formData.passenger_count),
        passenger_count_domestic: Number(formData.passenger_count_domestic),
        passenger_count_local: Number(formData.passenger_count_local),
        passenger_count_international: Number(formData.passenger_count_international) 
    });
    console.log(body);
    axios.post('/api/vehicle/', body, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: VEHICLE_ADDED,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

export const getStatistics = (dateFilter) => (dispatch, getState) => {
    axios
      .get(`/api/simplevehicle/?search=${dateFilter}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: GET_STATISTICS,
          payload: res.data,
        });
        console.log(res.data)
      }).catch((err) => console.log(err));
    };
    
export const setThedate = (dateFilter) => (dispatch, getState) => {
        dispatch({
            type: SET_DATE,
            payload: dateFilter
        })

  };
