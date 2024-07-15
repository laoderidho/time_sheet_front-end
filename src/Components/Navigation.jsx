import React, { useEffect } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = (props) => {

  const location = useLocation()

  // useEffect(() =>{
  //   console.log(location.pathname)
  // },[location])

  return (
    <div className='content'>
        <Navbar className='shadow-sm bg-white'>
            <Container>
                <Navbar.Brand> 
                    <h4 className='brand-text'>Timesheet <br/> Management</h4>
                </Navbar.Brand>
            </Container>
        </Navbar>
        <div className='shadow-sm bg-white'>
          <Container>
              <Navbar>
                <h2 className='timesheet-title'>HH Timesheet</h2>
              </Navbar>
              <Navbar>
                <Nav>
                    <div className='link-parent'>
                      <Nav.Link as={NavLink} to='/' exact className={location.pathname === '/' ? "active-timesheet-nav" : ""}>
                        Daftar Kegiatan
                      </Nav.Link>
                    </div>
                    <div className='link-parent'>
                      <Nav.Link as={NavLink} to='/setting' className={location.pathname === "/setting" ? "active-timesheet-nav" : ""}>
                        Pengaturan
                      </Nav.Link>
                    </div>
                </Nav>
              </Navbar>
          </Container>
        </div>
    {props.children}
    </div>
  )
}

export default Navigation;
