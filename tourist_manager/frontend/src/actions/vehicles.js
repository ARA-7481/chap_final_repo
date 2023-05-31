import axios from "axios";
import {GET_STATISTICS_REPORT, SEARCH_NOTFOUND, GET_STATISTICS, VEHICLE_ADDED, VEHICLEADD_FAIL, GET_VEHICLES, GET_VEHICLESTODAY, DELETE_VEHICLE, GETA_VEHICLE, UNGETA_VEHICLE, UNDELETE, SET_DATE, GET_RATES, SET_RATES, GET_USERS, DELETE_USER, RESET_SUBMIT_VEHICLE } from "./types";
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

//Post

export const addVehicle = (formData) => async (dispatch, getState) => {
    try {
      const body = JSON.stringify({
        ...formData,
        passenger_count: Number(formData.passenger_count),
        passenger_count_domestic: Number(formData.passenger_count_domestic),
        passenger_count_local: Number(formData.passenger_count_local),
        passenger_count_international: Number(formData.passenger_count_international),
      });
      console.log(body);
      const res = await axios.post("/api/vehicle/", body, tokenConfig(getState));
      dispatch({
        type: VEHICLE_ADDED,
        payload: res.data,
      });
  
      setTimeout(() => {
        dispatch({ type: RESET_SUBMIT_VEHICLE });
      }, 2000);
    } catch (err) {
      console.log(err);
      // Handle the error here
      // For example, check if there is an error message
      if (err.response && err.response.data && err.response.data.message) {
        // If there is an error message, dispatch an action to update the error state
        dispatch({
          type: VEHICLEADD_FAIL,
          payload: err.response.data.message,
        });
      } else {
        // If there is no error message, handle it here
        // For example, dispatch a generic error message
        dispatch({
          type: VEHICLEADD_FAIL,
          payload: "An error occurred while adding the vehicle",
        });
      }
    }
  };

  export const failAdd = () => (dispatch, getState) => {
    dispatch({
        type: VEHICLEADD_FAIL,
        payload: null
    })
    setTimeout(() => {
      dispatch({ type: RESET_SUBMIT_VEHICLE });
    }, 2000);

};

export const searchFail = () => (dispatch, getState) => {
  dispatch({
      type: SEARCH_NOTFOUND,
      payload: null
  })
  setTimeout(() => {
    dispatch({ type: RESET_SUBMIT_VEHICLE });
  }, 2000);

};

export const getStatistics = (dateFilter) => (dispatch, getState) => {
    axios
      .get(`/api/simplevehicle/?search=${dateFilter}`)
      .then((res) => {
        dispatch({
          type: GET_STATISTICS,
          payload: res.data,
        });
        console.log(res.data)
      }).catch((err) => console.log(err));
    };


    export const getStatisticsReport = (dateFilter) => (dispatch, getState) => {
      let monthlyData = new Array(12);
      for (let month = 1; month <= 12; month++) {
        let monthString = month < 10 ? `0${month}` : `${month}`;
        axios
          .get(`/api/simplevehicle/?search=${dateFilter}-${monthString}`)
          .then((res) => {
            let localTotal = 0;
            let domesticTotal = 0;
            let internationalTotal = 0;
            res.data.forEach((item) => {
              localTotal += item.local_bill;
              domesticTotal += item.domestic_bill;
              internationalTotal += item.international_bill;
            });
            monthlyData[month - 1] = {
              localTourists: localTotal,
              domesticTourists: domesticTotal,
              internationalTourists: internationalTotal,
            };
            if (monthlyData.filter((x) => x).length === 12) {
              dispatch({
                type: GET_STATISTICS_REPORT,
                payload: monthlyData,
              });
              console.log(monthlyData);
            }
          })
          .catch((err) => console.log(err));
      }
    };


export const setThedate = (dateFilter) => (dispatch, getState) => {
        dispatch({
            type: SET_DATE,
            payload: dateFilter
        })

  };

export const getRates = () => (dispatch, getState) => {
    axios.get(`/api/rates/1/`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GET_RATES,
            payload: res.data
        });
    }).catch(err => console.log(err));


};


export const setRates = (formData) => (dispatch, getState) => {
    const body = JSON.stringify({ 
        ...formData,
        local_rate: Number(formData.local_rate),
        domestic_rate: Number(formData.domestic_rate),
        international_rate: Number(formData.international_rate),
    });
    console.log(body);
    axios.patch('/api/rates/1/', body, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: SET_RATES,
            payload: res.data
        });
    }).catch(err => console.log(err));
};


export const getUsers = () => (dispatch, getState) => {
    axios.get(`/api/userlist/`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    }).catch(err => console.log(err));


};

export const deleteUser = (id) => (dispatch, getState) => {
    axios.delete(`/api/userlist/${id}`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: DELETE_USER,
            payload: id
        });
    }).catch(err => console.log(err));


};
