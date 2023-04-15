import {VEHICLE_ADDED, VEHICLEADD_FAIL, GET_VEHICLES, GET_VEHICLESTODAY, DELETE_VEHICLE, GETA_VEHICLE, UNGETA_VEHICLE, UNDELETE, GET_STATISTICS, SET_DATE} from "../actions/types.js"

const initialState = {
    vehicles: [],
    vehicle: [],
    filteredvehicles: [],
    dateforstatistics: null,
    vehiclesforstatistics: [],    
    isClicked: false,
    isDeleted: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VEHICLES:
            return{
                ...state,
                vehicles: action.payload
            };
        
        case GET_VEHICLESTODAY:
            const currentDate = new Date().toISOString().slice(0, 10);
            //const filteredVehicles = action.payload.filter(vehicle => vehicle.date === currentDate);
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
                filteredvehicles: [...state.filteredvehicles, action.payload]
            };
        case VEHICLEADD_FAIL:
            
        case UNGETA_VEHICLE:
            return{
                ...state,
                isClicked: false
            };
        case DELETE_VEHICLE:
            return {
                ...state,
                vehicles: state.vehicles.filter((vehicle) => vehicle.vehicle_id !== action.payload),
                isClicked: false,
                isDeleted: true
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
        default:
            return state;
            
    }
        
}