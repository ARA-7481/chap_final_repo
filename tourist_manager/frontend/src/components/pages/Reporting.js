import React, { Fragment, useEffect, useState } from 'react';
import {getStatisticsReport } from '../../actions/vehicles';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import withAuth from '../common/withAuth';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import moment from 'moment/moment';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Reporting(props) {
  let totalEarning = 0;
  let totalDomesticBill = 0;
  let totalLocalBill = 0;
  let totalInternationalBill = 0;

  props.vehiclesforstatisticsreport.forEach((item) => {
    totalDomesticBill += item.domesticTourists || 0;
    totalLocalBill += item.localTourists || 0;
    totalInternationalBill += item.internationalTourists || 0;
  });

  totalEarning = totalDomesticBill + totalLocalBill + totalInternationalBill

  const [chartData, setChartData] = useState({
    labels: ['Local', 'Domestic', 'International'],
    datasets: [
      {
        label: 'Earnings',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        data: [Number(totalLocalBill), Number(totalDomesticBill), Number(totalInternationalBill)],
      },
    ],
  });

   const [monthlyChartData, setMonthlyChartData] = useState({
     labels: monthNames,
     datasets: [
       {
         label: "Local Tourists",
         data: props.vehiclesforstatisticsreport.map(item => item.localTourists),
         backgroundColor: "rgba(255,99,132,0.2)",
         borderColor: "rgba(255,99,132,1)",
         borderWidth: 1
       },
       {
         label: "Domestic Tourists",
         data: props.vehiclesforstatisticsreport.map(item => item.domesticTourists),
         backgroundColor: "rgba(54,162,235,0.2)",
         borderColor: "rgba(54,162,235,1)",
         borderWidth: 1
       },
       {
         label: "International Tourists",
         data: props.vehiclesforstatisticsreport.map(item => item.internationalTourists),
         backgroundColor: "rgba(255,206,86,0.2)",
         borderColor: "rgba(255,206,86,1)",
         borderWidth: 1
       }
     ]
   });

   useEffect(() => {
     setChartData({
       labels: ['Local', 'Domestic', 'International'],
       datasets: [
         {
           label: 'Earnings',
           backgroundColor: 'rgba(0, 139, 0, 0.5)',
           borderColor: 'rgb(0, 139, 0)',
           data: [Number(totalLocalBill), Number(totalDomesticBill), Number(totalInternationalBill)],
         },
       ],
     });
     setMonthlyChartData({
       labels: monthNames,
       datasets: [
         {
           label: "Local Tourists",
           data: props.vehiclesforstatisticsreport.map(item => item.localTourists),
           backgroundColor: "rgba(255,99,132,0.2)",
           borderColor: "rgba(255,99,132,1)",
           borderWidth: 1
         },
         {
           label: "Domestic Tourists",
           data: props.vehiclesforstatisticsreport.map(item => item.domesticTourists),
           backgroundColor: "rgba(54,162,235,.2)",
           borderColor: "rgba(54,162,235,.1)",
           borderWidth: 1
         },
         {
           label: "International Tourists",
           data: props.vehiclesforstatisticsreport.map(item => item.internationalTourists),
           backgroundColor:"rgba(255,.6,.6,.2)",
           borderColor:"rgba(255,.6,.6,.1)",
           borderWidth :1
         }
       ]
     });
   }, [props.vehiclesforstatisticsreport]);

   return (
     <div style={{ display: 'flex' }}>
       <div className="d-flex justify-content-center">
         <div
           className="table-container rounded"
           style={{
             height: '150%',
             width: '100%',
             marginTop: '10px',
             marginLeft: '20px',
             marginRight: '20px',
             borderWidth:'3px'
           }}
         >
           <h2 style={{ color:'black', marginBottom:'20px'}}>
             Annual Sales Report
           </h2>
           <Table bordered style={{color:'rgba(220, 220, 220, .85)',backgroundColor:'rgba(51, 51, 51, .35)',fontSize:'24px'}}>
             <thead>
               <tr>
                 <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Month</th>
                 <th style={{maxWidth:'200px', width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Local Tourists</th>
                 <th style={{maxWidth:'200px', width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Domestic Tourists</th>
                 <th style={{maxWidth:'200px', width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>International Tourists</th>
                 <th style={{maxWidth:'200px', width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Total</th>
               </tr>
             </thead>
             <tbody>
               {props.vehiclesforstatisticsreport.map((monthData,index) => (
                 <tr key={index}>
                   <td>{monthNames[index]}</td>
                   <td> ₱{monthData.localTourists}</td>
                   <td> ₱{monthData.domesticTourists}</td>
                   <td> ₱{monthData.internationalTourists}</td>
                   <td> ₱{monthData.internationalTourists + monthData.domesticTourists + monthData.localTourists}</td>
                 </tr>
               ))}
               <tr style={{backgroundColor:'green'}}>
                 <td> </td>
                 <td>{totalLocalBill}</td>
                 <td>{totalDomesticBill}</td>
                 <td>{totalInternationalBill}</td>
                 <td>{totalEarning}</td>
               </tr>
             </tbody>
           </Table>
         </div>
       </div>

       <div style={{display:'flex', flexDirection:'column'}}>

          <CDBContainer style={{width:'800px', maxHeight:'350px', marginLeft:'100px'}}>
            <h3 className="mt-5">Monthly Sales Summary</h3>
            <Bar data={monthlyChartData} options={{ responsive:true }} />
            <h3 className="mt-5">Total</h3>
            <Bar data={chartData} options={{ responsive:true }} style={{height: '150px'}} />
          </CDBContainer>

       
        </div>

     </div>

   );
}

Reporting.propTypes = {
 vehiclesforstatisticsreport : PropTypes.array,
};

const mapStateToProps = (state) => ({
 vehiclesforstatisticsreport : state.vehicles.vehiclesforstatisticsreport,
});

export default withAuth(connect(mapStateToProps,{getStatisticsReport})(Reporting));