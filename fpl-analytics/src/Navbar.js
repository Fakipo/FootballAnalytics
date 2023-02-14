import { Button } from "bootstrap";
import React, { useState } from "react";import { ReactDOM } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import GetPLStandingsData from "./PLTable";

function showComponent(selectedItem){
    alert('yes hello' + selectedItem);
}

let OurNav = () => {
    const [selected,changeSelected] = useState('standings');
    return (
    <Container>
        <Navbar bg="dark" variant="dark">
              <Nav className="me-auto">
              <Nav.Link id = "standings">Standings</Nav.Link>
              <Nav.Link id = "fixtures" onClick={() => alert('hello')}>Fixtures</Nav.Link>
              <Nav.Link id = "leaders">Top Scorers</Nav.Link>
              </Nav>
        </Navbar>
        <GetPLStandingsData/>
    </Container>
    )
};

export default OurNav;