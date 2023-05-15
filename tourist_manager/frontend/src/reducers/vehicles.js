import {RESET_SUBMIT_VEHICLE, VEHICLE_ADDED, VEHICLEADD_FAIL, GET_VEHICLES, GET_VEHICLESTODAY, DELETE_VEHICLE, GETA_VEHICLE, UNGETA_VEHICLE, UNDELETE, GET_STATISTICS, SET_DATE, GET_RATES, SET_RATES} from "../actions/types.js"

const initialState = {
    vehicles: [],
    vehicle: [],
    filteredvehicles: [],
    dateforstatistics: null,
    vehiclesforstatistics: [],
    local_rate: 0,
    domestic_rate: 0,    
    international_rate: 0,
    isClicked: false,
    isDeleted: false,
    submit_vehicle: null

}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VEHICLES:
            return{
                ...state,
                vehicles: action.payload
            };
        
        case GET_VEHICLESTODAY:
            const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
            return {
                ...state,
                filteredvehicles: action.payload.filter((vehicle) => vehicle.date === currentDate),
            };

        case GETA_VEHICLE:
            return{
                ...state,
                vehicle: action.payload,
                isClicked: true
            };

        case VEHICLE_ADDED:
            return{
                ...state,
                vehicle: action.payload,
                vehicles: [...state.vehicles, action.payload],
                filteredvehicles: [...state.filteredvehicles, action.payload],
                submit_vehicle: "Success"
            };
        case VEHICLEADD_FAIL:
            return{
                ...state,
                submit_vehicle: "Failed"
            }
        case RESET_SUBMIT_VEHICLE:
            return {
                ...state,
                submit_vehicle: null,
            }
        case UNGETA_VEHICLE:
            return{
                ...state,
                isClicked: false
            };
        case DELETE_VEHICLE:
            return {
                ...state,
                vehicles: state.vehicles.filter((vehicle) => vehicle.vehicle_id !== action.payload),
                filteredvehicles: state.filteredvehicles.filter((vehicle) => vehicle.vehicle_id !== action.payload),        
            };
        case UNDELETE:
            return{
                ...state,
                isDeleted: false
            };

        case GET_STATISTICS:
            return{
                ...state,
                vehiclesforstatistics: action.payload
            };
        case SET_DATE:
            return{
                ...state,
                dateforstatistics: action.payload
                };

        case GET_RATES:
            return{
                ...state,
                local_rate: action.payload.local_rate,
                domestic_rate: action.payload.domestic_rate,
                international_rate: action.payload.international_rate,
                };

        case SET_RATES:
            return{
                ...state,
                local_rate: action.payload.local_rate,
                domestic_rate: action.payload.domestic_rate,
                international_rate: action.payload.international_rate,
                };
        
        default:
            return state;
            
    }
        
}