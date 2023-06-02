import { useNavigate } from "react-router-dom";
import React, { useState, Fragment } from 'react';

function Unauthorized(){
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/checker');
    }

    return (
    <Fragment>
      <div style={{ width: '120%', marginLeft:'1px' }}>
      <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="btn btn-primary mx-auto" onClick={goBack}>Return To Dashboard</button>
            </div>
        </section>
      </div>
    </Fragment>
    )
}

export default Unauthorized