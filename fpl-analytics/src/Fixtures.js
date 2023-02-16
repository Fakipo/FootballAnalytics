import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

const TableFixtures = (props) => {
    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <TableHeading />
                </thead>
                <tbody>
                    {props.data.map ((item) => {
                        return (
                            <FixtureRows row = {item} />
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

const TableHeading = () => {
    return(
        <tr>
            <th>Date</th>
            <th>Fixture</th>
            <th>Gameweek</th>
            <th>Referee</th>
            <th>Venue</th>
        </tr>
    )
};

const FixtureRows = (props) => {
    const teamAway = props.row['teams']['away']['name'];
    const teamHome = props.row['teams']['home']['name'];
    let referee = props.row['fixture']['referee'];
    if(referee == '' || referee == null){
        referee = 'Not declared yet'
    }
    const jsonDate = new Date (props.row['fixture']['date']);
    const gameDate = jsonDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
     + '-' + jsonDate.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
     + '-' + jsonDate.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const awayFlag = props.row['teams']['away']['logo'];
    const homeFlag = props.row['teams']['home']['logo'];
    const gameTime = jsonDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
     + ':' + jsonDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    const venue = props.row['fixture']['venue']['name'] + ', ' + props.row['fixture']['venue']['city'];
    let gameweek = (props.row['league']['round']);
    gameweek = gameweek.substring(16,gameweek.length);
    return(
        <tr>
            <td> {gameDate} </td>
            <td>
                <Image src = {homeFlag} style={{width: '30px'}}/>{teamHome} (H) 
                <div>{gameTime} </div>
                <Image src = {awayFlag} style={{width: '30px'}}/>  {teamAway} (A)
            </td>
            <td>{gameweek}</td>
            <td>{referee}</td>
            <td>{venue}</td>
        </tr>
    )

}

const Fixtures = (props) => {
    const [fixturesArray,setFixturesArray] = useState([]);
     useEffect(() => {
        fetch('./RapidAPIFixtures.json').
            then((response) =>{
                if(!response.ok){
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            }).then((data) => {
                let fixtureResponseArray = data['response'];
                let newArray = fixtureResponseArray.filter((item) => item['fixture']['status']['long'] == 'Not Started');                
                newArray.sort(function(a, b) {
                    let c = new Date(a['fixture'].date);
                    let d = new Date(b['fixture'].date);
                    return c-d;
                });
                
                setFixturesArray(newArray);
            });
            },[]);

        if(props.showFixtures){
            return(
                <div>
                     <TableFixtures data = {fixturesArray}/>
                </div>
                );
    }
    else{
        return (null);
    }   
}

export default Fixtures;