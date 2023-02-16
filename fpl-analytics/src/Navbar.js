import { Button } from "bootstrap";
import React, { useState } from "react";import { ReactDOM } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import GetPLStandingsData from "./PLTable";
import Fixtures from "./Fixtures";
import TopPlayersComp from "./TopPlayers";

function showComponent(selectedItem){
    alert('yes hello' + selectedItem);
}

let OurNav = () => {
    const [showStandings,setShowStandings] = useState(true);
    const [showFixtures, setShowFixtures] = useState(false);
    const [showTopScorer, setShowTopScorer] = useState(false);
    return (
      <div>
      <Navbar bg="dark" variant="dark">
              <Nav className="me-auto">
              <Nav.Link id = "standings" onClick={() => {
                setShowFixtures(false);
                setShowStandings(true);
                setShowTopScorer(false);
              }}>Standings</Nav.Link>
              <Nav.Link id = "fixtures" onClick={() => {
                setShowFixtures(true);
                setShowStandings(false);
                setShowTopScorer(false);
              }}>Fixtures</Nav.Link>
              <Nav.Link id = "leaders" onClick={() => {
                setShowFixtures(false);
                setShowStandings(false);
                setShowTopScorer(true);
              }}>Top Scorers</Nav.Link>
              </Nav>
      </Navbar>
      <Container>
        <GetPLStandingsData showStandings = {showStandings}/>
        <Fixtures showFixtures = {showFixtures}/>
        <TopPlayersComp showTopScorer = {showTopScorer}/>
      </Container>
      </div>
    )
};

export default OurNav;