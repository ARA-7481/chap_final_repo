import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setRegister } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


function Register(props){
  const navigate = useNavigate();
    const initialState = {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        account_type: ""
      }
  const [formData, setFormData] = useState(initialState);
  const { username, first_name, last_name, password, account_type } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.setRegister(formData)
    setFormData(initialState);
  };

  return (
    <div className = "container">
    <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Firstname</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={onChange}
                value={first_name}
              />
            </div>

            <div className="form-group">
              <label>Lastname</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={onChange}
                value={last_name}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <label>Account Type</label>
              <input
                type="text"
                className="form-control"
                name="account_type"
                onChange={onChange}
                value={account_type}
                placeholder='office_admin/staff_only'
              />
            </div>
            

            <div className="form-group">
              <button type="submit" className="btn btn-primary d-block mx-auto">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>

  )
}

Register.propTypes = {
    setRegister: PropTypes.func,
  };
  
const mapStateToProps = (state) => ({
  });

export default connect(mapStateToProps, { setRegister})(Register);