import React, { Fragment, useEffect, useState } from 'react';
import {getStatisticsReport } from '../../actions/vehicles';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import withAuth from '../common/withAuth';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Card from 'react-bootstrap/Card';
import moment from 'moment/moment';
import logonew from '../../assets/images/LOGO.jpg'

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

function FinalReport(props) {
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
     <Card style={{width: '100%', border: 'none'}}>

        <div style={{ display: 'flex', margin: 'auto'}}>
        <div>
        <img src={logonew} alt="logo" style={{width: '180px', height: '180px', marginRight: '30px'}}/>
        </div>
        <div style={{marginLeft: '10px'}}>
        <Card.Title className="text-center" style={{ fontSize: '35px', marginTop: '15px' }}>Province of Bohol</Card.Title>
        <h5 style={{marginTop: '5px'}} className="text-center">Municipality of Carmen</h5>
        <h6 className="text-center" style={{marginTop: '5px'}}>Chocolate Hills Complex</h6>
        <h2 className="text-center" style={{ color:'black', marginBottom:'20px'}}>Annual Sales Report</h2>
        </div>
        </div>

     <div>
       <div className="d-flex justify-content-center">
         <div
           className="table-container rounded"
           style={{
             height: '150%',
             width: '100%',
             marginTop: '30px',
             marginLeft: '20px',
             marginRight: '20px',
             borderWidth:'3px'
           }}
         >
           <Table bordered style={{fontSize:'18px'}}>
             <thead>
               <tr>
                 <th style={{width: '400px',textAlign: 'center', verticalAlign: 'middle'}}>Month</th>
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
               <tr style={{color: 'green', fontSize: '25px'}}>
                 <td> </td>
                 <td> ₱{totalLocalBill}</td>
                 <td> ₱{totalDomesticBill}</td>
                 <td> ₱{totalInternationalBill}</td>
                 <td> ₱{totalEarning}</td>
               </tr>
             </tbody>
           </Table>
         </div>
       </div>

       
        <div>
          <CDBContainer style={{width:'1000px', height:'250px', marginLeft:'1px', marginRight:'10px'}}>
            <h4>Monthly Sales Summary</h4>
            <Bar data={monthlyChartData} options={{ responsive:true }} />
          </CDBContainer>
          </div>

          <div style={{marginTop: '50px'}}>
          <CDBContainer style={{width:'1000px', height:'250px', marginLeft:'1px', marginRight:'10px'}}>
            <h4>Total</h4>
            <Bar data={chartData} options={{ responsive:true }} style={{height: '150px'}} />
            </CDBContainer>
          </div>
       
        

     </div>
     </Card>
   );
}

FinalReport.propTypes = {
 vehiclesforstatisticsreport : PropTypes.array,
};

const mapStateToProps = (state) => ({
 vehiclesforstatisticsreport : state.vehicles.vehiclesforstatisticsreport,
});

export default withAuth(connect(mapStateToProps,{getStatisticsReport})(FinalReport));