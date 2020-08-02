import React from 'react';
import logo from '../images/logo.png';
import {  Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Home() {
    return (
        <>
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" component={Link} to="/survey"/>
            <br/>
            <Button variant="outlined" color="secondary" component={Link} to="/survey">
                Take Survey
            </Button>
      </div>
      </>
    );
}

export default Home;