import  {
    Dashboard,
    VehicleDetails
}  from "../components/pages/index";

const routes  = [
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/vehicledetails',
        element: <VehicleDetails />
    },
]

export default routes