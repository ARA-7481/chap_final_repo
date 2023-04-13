import React, {Fragment} from 'react'
import Overview from './Overview'
import Header from '../reusable/Header'
import Dailyqueue from './Dailyqueue'


export default function Dashboard() {
  return (
    <Fragment>
      <Dailyqueue />
    </Fragment>
  )
}
