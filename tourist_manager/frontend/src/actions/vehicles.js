import axios from "axios";
import { GET_VEHICLES } from "./types";

//GET VEHICLES
export const getVehicles = () => dispatch => {
    axios.get('/api/vehicle')
    .then(res =>{
        dispatch({
            type: GET_VEHICLES,
            payload: res.data
        });
    }).catch(err => console.log(err));
}