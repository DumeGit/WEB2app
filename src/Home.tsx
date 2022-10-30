import React, {useState} from 'react';
import './App.css';
import ScoreTable from "./scoreTable/ScoreTable";
import {ClubModel} from "./models/ClubModel";
import {Button, Card, Tab, Tabs} from "react-bootstrap";
import Results from "./results/Results";
import {RoundModel} from "./models/RoundModel";
import {useAuth0} from "@auth0/auth0-react";
import isAdmin from "./login/LoginUtils";
import {ResultModel} from "./models/ResultModel";
import {CommentModel} from "./models/CommentModel";

const initialClubs: ClubModel[] = [
    {
        name: "Dinamo",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }, {
        name: "Hajduk",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }, {
        name: "Osijek",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }, {
        name: "Slaven Belupo",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }, {
        name: "Varaždin",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }, {
        name: "Rijeka",
        points: 0,
        goalDifference: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gamesPlayed: 0,
    }
]

const initialResultsRoundOne: ResultModel[] = [
    {
        home: initialClubs[0],
        homeGoals: 2,
        away: initialClubs[1],
        awayGoals: 1
    },
    {
        home: initialClubs[2],
        homeGoals: 3,
        away: initialClubs[3],
        awayGoals: 3
    },
    {
        home: initialClubs[4],
        homeGoals: 4,
        away: initialClubs[5],
        awayGoals: 1
    }
]

const initialResultsRoundTwo: ResultModel[] = [
    {
        home: initialClubs[0],
        homeGoals: 4,
        away: initialClubs[5],
        awayGoals: 3
    },
    {
        home: initialClubs[1],
        homeGoals: 2,
        away: initialClubs[4],
        awayGoals: 2
    },
    {
        home: initialClubs[2],
        homeGoals: 1,
        away: initialClubs[3],
        awayGoals: 0
    }
]

const initialCommentsRoundOne: CommentModel[] = [
    {
        name: "ttihanic@mailinator.com",
        comment: "Amazing round Dinamo is doing great",
        createdAt: new Date("10/15/2022")
    },
    {
        name: "admin@mailinator.com",
        comment: "Please be nice in the comments",
        createdAt: new Date("10/15/2022")
    }
]

const initialCommentsRoundTwo: CommentModel[] = [
    {
        name: "pperic@mailinator.com",
        comment: "Man I wish Hajduk was doing better",
        createdAt: new Date("10/22/2022")
    },
    {
        name: "ttihanic@mailinator.com",
        comment: "Lmao Rijeka sucks",
        createdAt: new Date("10/23/2022")
    }
]

export default function Home() {
    const {isAuthenticated, user} = useAuth0();
    const [rounds, setRounds] = useState<RoundModel[]>([
        {
            results: <Results initialResults={initialResultsRoundOne} initialComments={initialCommentsRoundOne}/>
        }, {
            results: <Results initialResults={initialResultsRoundTwo} initialComments={initialCommentsRoundTwo}/>
        }, {
            results: <Results initialResults={[]} initialComments={[]}/>
        }
    ])

    function onNewRound() {
        let newRounds = [...rounds];
        newRounds.push({results: <Results initialResults={[]} initialComments={[]}/>})
        setRounds(newRounds)
    }

    return (
        <div className="App">
            <Card>
                <Card>
                    <ScoreTable/>
                </Card>
                <Card>{
                    (isAuthenticated && isAdmin(user?.email)) &&
                    <Card.Header>
                        <Button onClick={() => onNewRound()}>Add new round</Button>
                    </Card.Header>
                }

                    <Card.Body>
                        <Tabs>
                            {rounds.map((value, index, array) => {
                                return (
                                    <Tab id={index.toString()} eventKey={index} title={index + 1 + ". Round"}>
                                        {value.results}
                                    </Tab>
                                )
                            })
                            }
                        </Tabs>
                    </Card.Body>
                </Card>
            </Card>
        </div>
    );
}
