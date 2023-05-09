import Dailyqueue from './Dailyqueue'
import React, { useState, Fragment } from 'react'
import Vehicleform from './Vehicleform'
import { Card } from 'react-bootstrap';


export default function Dashboard() {
  return (
    <div className='container'>
    <div style={{ display: 'flex', width: '145%' }}>
    <Card style={{ width: '80%', height: '100%', border: "none", display: 'flex', alignItems: 'flex-start' }}>
  <h3>Vehicle Daily List</h3>
  <Dailyqueue />
</Card>
    <Card style={{ width: '20%', height: '100%', border: "none" }}>
    <Button variant="success">Success</Button>{' '}
        <Vehicleform  />
        </Card>
  </div>
  </div>
  )

}
