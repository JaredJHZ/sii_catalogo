import React from 'react';
import {Navbar, Col, Row, Container} from 'react-bootstrap';

let navbar = (props) => {

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
      <Row className="full">

      <Col xs={2}>
            <div onClick = {props.openMenu} className="hamburger">
            <div  className="line"></div>
            <div  className="line"></div>
            <div  className="line"></div>
            </div>
        </Col>


        <Col xs={8}>
            <div className="navTitle">
              {props.title}
            </div>
        </Col>

        


        <Col xs={2}>
          <Navbar.Brand href="#home">
          <img
            alt=""
            src={props.logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        </Col>
      </Row>
      </Container>
  </Navbar>
  );
    
}


export default navbar;