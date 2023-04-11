import axios from "axios";
import { GET_VEHICLES, DELETE_VEHICLE, GETA_VEHICLE, UNGETA_VEHICLE, UNDELETE } from "./types";
import { tokenConfig } from './auth';

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