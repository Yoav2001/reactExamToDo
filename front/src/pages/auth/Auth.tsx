import React from 'react';
import  {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand
} from 'reactstrap';


// import {taskModal} from '../../../../back/modals/taskModal'





const Auth  =() =>{

   
   // Collapse isOpen State
   const [isOpen, setIsOpen] = React.useState(false);
        return (
          <div style={{
            display: 'block', width: 550, padding: 30
        }}>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                  
                        <NavItem>
                            <NavLink href="login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="signUp">Signup</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >


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