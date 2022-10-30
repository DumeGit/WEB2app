import {Table} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {ClubModel} from "../models/ClubModel";
import {ClubContext} from "../App";

export function sortClubs(clubList: ClubModel[]) {
    clubList.sort((a, b) => {
        return a.points === b.points ? b.goalDifference - a.goalDifference : b.points - a.points
    });
    let sortedClubs = clubList.map(club => ({...club}))
    return sortedClubs;
}

export default function ScoreTable() {

    const {clubs, setClubs} = useContext(ClubContext);

    useEffect(() => {
        setClubs(sortClubs(clubs));
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Games played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Losses</th>
                <th>Goal difference</th>
                <th>Points</th>
            </tr>
            </thead>
            <tbody>
            {
                clubs.map((club, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{club.name}</td>
                        <td>{club.gamesPlayed}</td>
                        <td>{club.wins}</td>
                        <td>{club.draws}</td>
                        <td>{club.losses}</td>
                        <td>{club.goalDifference}</td>
                        <td>{club.points}</td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    )
        ;
}
