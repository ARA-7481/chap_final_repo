import React, {Fragment} from 'react'
import Form from './form'
import Overview from './overview'
import Header from '../reusable/Header'


export default function Dashboard() {
  return (
    <Fragment>
    <Form/>
    <Overview/>
    </Fragment>
  )
}
