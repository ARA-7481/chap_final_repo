import Dailyqueue from './Dailyqueue'
import React, { useState, Fragment } from 'react'
import Vehicleform from './Vehicleform'
import { Card } from 'react-bootstrap';


export default function Dashboard() {
  return (
    <div className='container'>
    <div style={{ display: 'flex', width: '145%' }}>
    <Card style={{ width: '80%', height: '100%', border: "none" }}>
      <h2 className='text-center'>Vehicle Daily List</h2>
        <Dailyqueue />
        </Card>
    <Card style={{ width: '20%', height: '100%', border: "none" }}>
        <Vehicleform  />
        </Card>
  </div>
  </div>
  )

}
