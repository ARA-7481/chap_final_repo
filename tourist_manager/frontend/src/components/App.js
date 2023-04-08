import React, { Component, Fragment } from "react";
//import { ReactDOM } from "react-dom";
//import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Landingpage from "./pages/Landingpage";
import { Provider } from "react-redux";
import store from '../store';
import PrivateRoute from "./common/PrivateRoute";
import Header from "./reusable/Header";

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                        <Routes>
                            <Route exact path="/" element = {<Landingpage />} />
                            <Route exact path="/dashboard" element = {<Dashboard />} />
                            <Route exact path="/register" element = {<Register />} />
                            <Route exact path="/login" element = {<Login />} />
                        </Routes>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

root.render(<App />);