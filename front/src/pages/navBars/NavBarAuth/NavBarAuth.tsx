import React from 'react';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navBarAuth.css"

import { Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, } from 'reactstrap';




const NavBarAuth = () => {


    // Collapse isOpen State
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="" style={{
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



    )

}

export default NavBarAuth;