import React from 'react';
import  {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap-Container.css'

import {  Link } from "react-router-dom";

// import {taskModal} from '../../../../back/modals/taskModal'





const Auth  =() =>{

   
  
        return (
          <Navbar bg="light" variant="light">
          <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          </Container>
        </Navbar>



        //   <div>
        //   <li>
        //     <Link to="/">Dogs</Link>
        //   </li>
        //   <li>
        //     <Link to="/homeToDo">Cats</Link>
        //   </li>
        //   <li>
        //     <Link to="/sheeps">Sheeps</Link>
        //   </li>
        //   <li>
        //     <Link to="/goats">Goats</Link>
        //   </li>
        // </div>  

        )

      }

export default Auth;