import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";
import {Moon, Sun, ThreeDots} from '@styled-icons/bootstrap'
import { Popover } from "@mui/material";
import {Tab} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavbarMain = ({user, tabs, currentNavTab, setCurrentNavTab, params}) => {
  const { core40SDK } = useContext(ExtensionContext);

  const [faClass, setFaClass] = useState(true);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    console.log("user",user)
  },[user])

  const handleClick = (val) => {
    if (val !== faClass) {      
      setFaClass(val);
      document.body.classList.toggle("dark-mode");
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  }

  return (
    <Container fluid className="padding-0">
      <div className="inner_page_block white_option"></div>

      <Navbar collapseOnSelect expand="lg">
        <Container fluid>
          <a href="" target="_blank" className="mneg5"></a>

          <div className="white-logo"></div>

          <Tab.Container mountOnEnter
                defaultActiveKey={currentNavTab}
                onSelect={(k) => setCurrentNavTab(k)}>
                <Nav className="inner nav nav-tabs nav-fill">
                  {tabs?.map(t =>
                    <Nav.Item>
                      <Nav.Link active={t.route === params.path} eventKey={t.route} as={Link} to={`${t.route}`}>{t.title}</Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>
          </Tab.Container>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center">                    
              <a className={!faClass? "dark-layout active":"dark-layout"} onClick={() => handleClick(false)}>                    
                    <Moon />
              </a>
              <a className={faClass? "dark-layout active":"dark-layout"} onClick={() => handleClick(true)}>                    
                    <Sun />                
              </a>
              <Navbar.Text style={{display:'flex', alignItems:'center'}}>
                <div className="avatar-icon">
                  <img src={user.avatar_url} />
                </div>                
                {/* <i className="fal fa-user me-1 blue"></i> */}
                <div className="me-2 blue">
                  {user.display_name}
                </div>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavbarMain;
