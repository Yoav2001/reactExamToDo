import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navBarToDo.css"
import { Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav,} from 'reactstrap';


type props = {
  fullName:User["fullName"]
  
  }

const NavBarToDo:React.FC<props> = (fullName) => {

    const [isOpen, setIsOpen] = useState(false);
    const logOutOnClick = () => {
        console.log("log out function");

        sessionStorage.clear();
        window.location.href = 'login'

        

    }
    return (
        <div style={{
            display: 'block', width: 550, padding: 30
        }}>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                        <NavItem>
                            <NavLink href="homeToDo">my todos</NavLink>
                        </NavItem>
                        
                        <NavItem className='navbar-nav mt-2 navLinkLogAndEmail'>
                                {sessionStorage.getItem('USER EMAIL')}
                        </NavItem>
                        <NavItem className='navLinkLogAndEmail'>
                            <NavLink className='navLink' onClick={() => { logOutOnClick() }} >log out </NavLink>
                        </NavItem>
                      

                    </Nav>
                </Collapse>
            </Navbar>
        </div >

    )

}

export default NavBarToDo;