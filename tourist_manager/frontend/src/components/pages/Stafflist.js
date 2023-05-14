import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/vehicles';
import Table from 'react-bootstrap/Table';
import withAuth from '../common/withAuth';

//import '../../css/table.css'

function Stafflist(props) {

  useEffect(() => {
    props.getUsers();
  }, []);


  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="table-container rounded" style={{maxHeight: '85vh', overflowY: 'auto', width: '100%', marginTop: '10px', marginLeft: '20px'}}>
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th className='align-middle'>ID</th>
                <th className='align-middle'>Username</th>
                <th className='align-middle'>First Name</th>
                <th className='align-middle'>Last Name</th>
                <th className='align-middle'>Account Type</th>
                <th className='align-middle'>Password</th>
                
              </tr>
            </thead>
            <tbody>
              {props.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.profile.account_type}</td>
                    <td>{user.profile.unhashed_pw}</td>
                   
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}

Stafflist.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
  deleteUser: PropTypes.func
  
};

const mapStateToProps = (state) => ({
  users: state.auth.users,
});

export default withAuth(connect(mapStateToProps, { getUsers, deleteUser })(Stafflist));