import React, { useState } from "react";
import { ReactDOM } from "react";
import standingsData from './Standings.json';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

const TableHead = () => {
    return (
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Draw</th>
            <th>GD</th>
            <th>GF</th>
            <th>GA</th>
            <th>Form</th>
        </tr>        
    )
}

const Row = (props) => {
    const points = props.standings.points;
    const rank = props.standings.rank;
    const name = props.standings.team.name;
    const goalsDiff = props.standings.goalsDiff;
    const gamesPlayed = props.standings.all.played;
    const gamesWon = props.standings.all.win;
    const gamesLost = props.standings.all.lose;
    const form = props.standings.form;
    const gamesDraw = props.standings.all.draw;
    const goalsScored = props.standings.all.goals.for;
    const goalsAllowed = props.standings.all.goals.against;
    return(
        <tr key = {rank}>
            <td>{rank}</td>
            <td>{name} <Image src= {props.standings.team.logo} style={{width: '30px'}} /></td>
            <td>{points}</td>
            <td>{gamesPlayed}</td>
            <td>{gamesWon}</td>
            <td>{gamesLost}</td>
            <td>{gamesDraw}</td>
            <td>{goalsDiff}</td>
            <td>{goalsScored}</td>
            <td>{goalsAllowed}</td>
            <td>{form}</td>
        </tr>
    )
}

const TableStandings = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
            <TableHead />
            </thead>
            <tbody>
                {props.data.map(item => {
                   return <Row standings = {item} />
                })}
            </tbody>
        </Table>
    )
}


function GetPLStandingsData() {
    
    
    
    let standingsArray = standingsData['response'][0]['league']['standings'][0];
    console.log(standingsArray);
    const [rows,setRows] = useState(standingsArray);
    return (
        <div>
            <TableStandings data = {rows}/> 
        </div>
    )   
}
export default GetPLStandingsData;
