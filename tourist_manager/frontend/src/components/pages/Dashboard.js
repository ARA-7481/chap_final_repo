import Overview from './Overview'
import Header from '../reusable/Header'
import Dailyqueue from './Dailyqueue'
import React, { useState, Fragment } from 'react'
import Vehicleform from './Vehicleform'
import { Form } from 'react-router-dom'


export default function Dashboard() {
  return (
    <Fragment>
      <div style={{ width: '120%', marginLeft:'1px' }}>
      <Dailyqueue />
      <Vehicleform  />
      </div>
    </Fragment>
  )

}
