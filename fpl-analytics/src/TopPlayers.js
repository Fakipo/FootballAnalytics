import React from "react";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

const ScorersTable = (props) => {
    
    return(
        <Table Striped bordered>
            <thead>
                <TableHeader/>
            </thead>
            <tbody>
                {props.data.map((item,index) => {
                   return <Rows row = {{item, index}} />
                })
                }
            </tbody>
        </Table>
    )
};

const TableHeader = () => {
    return (
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Shots</th>
            <th>Shots on target</th>
            <th>Passes</th>
            <th>Key Passes</th>

        </tr>
    )
}
const Rows = (props) => {
    const rank = props.row.index + 1;
    const name = props.row.item['player']['name'];
    console.log(name);
    const photoUrl = props.row.item['player']['photo'];
    const age = props.row.item['player']['age'];
    console.log('rank = ' + rank);
    const teamLogo = props.row.item.statistics[0].team.logo;
    const height = props.row.item['player']['height'];
    const weight = props.row.item['player']['weight'];
    const goals = props.row.item.statistics[0]['goals']['total'];
    const assists = props.row.item.statistics[0]['goals']['assists'];
    
    const shots = props.row.item.statistics[0]['shots']['total'];
    const shotsOnTarget = props.row.item.statistics[0]['shots']['on'];
    const passes = props.row.item.statistics[0]['passes']['total'];
    const keyPasses = props.row.item.statistics[0]['passes']['key'];
    return(
        <tr>
            <td> {rank} </td>
            <td> <Image src = {photoUrl} style = {{width: '70px'}}/> {name} <Image src = {teamLogo} style = {{width: '30px'}}/></td>
            <td>{age}</td>
            <td>{height}</td>
            <td>{weight}</td>
            <td>{goals}</td>
            <td>{assists ? assists : 0}</td>
            <td>{shots}</td>
            <td>{shotsOnTarget}</td>
            <td>{passes}</td>
            <td>{keyPasses}</td>
        </tr>
    )
}


function TopPlayersComp (props){

    const [playersList, setPlayersList] = useState([]);

    useEffect( () => {
        fetch('./TopScorers.json')
        .then((response) => {
            if(!response.ok){
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            setPlayersList(data['response']);
        })
    }, []);

    if(props.showTopScorer){
        return(
            <div>
                <ScorersTable data = {playersList} />
            </div>
        )
    }
    else{
        return(
            null
        )
    }
}

export default TopPlayersComp;