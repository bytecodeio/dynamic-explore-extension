import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";
import {Moon, Sun} from '@styled-icons/bootstrap'

const NavbarMain = ({user}) => {
  const { core40SDK } = useContext(ExtensionContext);
  const [message, setMessage] = useState("");
  const [me, setMe] = useState({});

  useEffect(() => {
    const initialize = async () => {
      try {
        setMessage(`${user.display_name}`);
      } catch (error) {
        setMessage("Error occured getting information about me!");
        console.error(error);
      }
    };
    initialize();
  }, [user]);

  const [faClass, setFaClass] = useState(true);

  const handleClick = () => {
    setFaClass(!faClass);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Container fluid className="padding-0">
      <div className="inner_page_block white_option"></div>

      <Navbar collapseOnSelect expand="lg">
        <Container fluid>
          <a href="" target="_blank" className="mneg5"></a>

          <div className="white-logo"></div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center">
              <Navbar.Text style={{display:'flex', alignItems:'center'}}>
                <a className="dark-layout" onClick={handleClick}>
                  <i style={{marginRight:'0'}}>
                    {faClass?
                      <Moon />
                    :
                      <Sun />
                    }
                  </i>

                </a>

                <i className="fal fa-user me-1 blue"></i>
                <a href="#login" className="me-2 blue">
                  {message}
                </a>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavbarMain;
