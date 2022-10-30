import {Button, Card, Form, Table} from "react-bootstrap";
import {ResultModel} from "../models/ResultModel";
import {useContext, useEffect, useState} from "react";
import {ClubModel} from "../models/ClubModel";
import {sortClubs} from "../scoreTable/ScoreTable";
import {useAuth0} from "@auth0/auth0-react";
import Comment from "../comments/Comment";
import {CommentModel} from "../models/CommentModel";
import CommentEditModal from "../comments/CommentEditModal";
import ResultEditModal from "./ResultEditModal";
import isAdmin from "../login/LoginUtils";
import {ClubContext} from "../App";
import Schedules from "../schedule/Schedules";

interface ResultsProps {
    initialResults: ResultModel[];
    initialComments: CommentModel[];
}

interface ResultForm {
    home: string;
    homeGoals: number;
    away: string;
    awayGoals: number;
}

export default function Results({initialResults, initialComments}: ResultsProps) {
    const {clubs, setClubs} = useContext(ClubContext);
    const {isAuthenticated, user} = useAuth0();

    const [results, setResults] = useState<ResultModel[]>([])
    const [show, setShow] = useState<boolean>(false)
    const [openCommentForm, setOpenCommentForm] = useState<boolean>(false)
    const [resultForm, setForm] = useState<ResultForm>({
        home: "Dinamo",
        homeGoals: 0,
        away: "Hajduk",
        awayGoals: 0
    })
    const [availableClubs, setAvailableClubs] = useState<ClubModel[]>(clubs)
    const [comments, setComments] = useState<CommentModel[]>([])
    const [commentForm, setCommentForm] = useState<string>("");
    const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
    const [editCommentIndex, setEditCommentIndex] = useState<number>(0);
    const [editResultIndex, setEditResultIndex] = useState<number>(0);
    const [openResultModal, setOpenResultModal] = useState(false);

    useEffect(() => {
        if (availableClubs.length > 0) {
            setForm({
                home: availableClubs[0].name,
                homeGoals: 0,
                away: availableClubs[1].name,
                awayGoals: 0
            })
        }
    }, [availableClubs])

    useEffect(() => {
        if (initialResults.length > 0) {
            initialResults.forEach((value) => {
                addResult({
                    home: value.home.name,
                    homeGoals: value.homeGoals,
                    away: value.away.name,
                    awayGoals: value.awayGoals
                }, results)
            })
            setAvailableClubs([])
        }

        if (initialComments.length > 0) {
            setComments(initialComments)
        }
    }, [])


    function addNewResult(result: ResultModel) {
        let newResults = results.map(result => ({...result}));
        newResults.push(result);
        setResults(newResults);
    }

    function onSubmit(e: any) {
        addResult(resultForm, results);
    }

    function addResult(addResult: ResultForm, newResults: ResultModel[]) {
        let updatedClubs = clubs.map(club => ({...club}));
        let homeClub: ClubModel = clubs.find((value) => value.name == addResult.home)!;
        let awayClub: ClubModel = clubs.find((value) => value.name == addResult.away)!;

        homeClub.gamesPlayed++;
        homeClub.goalDifference += addResult.homeGoals - addResult.awayGoals

        awayClub.gamesPlayed++;
        awayClub.goalDifference += addResult.awayGoals - addResult.homeGoals

        let newResult: ResultModel = {
            home: homeClub,
            away: awayClub,
            homeGoals: addResult.homeGoals,
            awayGoals: addResult.awayGoals
        }

        if (addResult.homeGoals > addResult.awayGoals) {
            homeClub.points += 3;
            homeClub.wins++;
            awayClub.losses++;
        } else if (addResult.homeGoals < addResult.awayGoals) {
            awayClub.points += 3;
            awayClub.wins++;
            homeClub.losses++;
        } else {
            homeClub.points++;
            awayClub.points++;
        }

        let homeIndex = updatedClubs.findIndex((value) => value.name == addResult.home)!
        let awayIndex = updatedClubs.findIndex((value) => value.name == addResult.away)!

        updatedClubs[homeIndex] = homeClub;
        updatedClubs[awayIndex] = awayClub;

        newResults.push(newResult);
        setResults(newResults);
        setClubs(sortClubs(updatedClubs))

        let newClubs = [...availableClubs]
        homeIndex = newClubs.findIndex((value) => value.name == addResult.home)!
        awayIndex = newClubs.findIndex((value) => value.name == addResult.away)!
        newClubs.splice(homeIndex, 1);
        newClubs.splice(awayIndex - 1, 1);
        setShow(newClubs.length == 0)
        setAvailableClubs(newClubs)
    }

    function onDeleteResult(index: number) {
        let updatedClubs = clubs.map(club => ({...club}));
        let homeClub: ClubModel = clubs.find((value) => value.name == results[index].home.name)!;
        let awayClub: ClubModel = clubs.find((value) => value.name == results[index].away.name)!;

        homeClub.gamesPlayed--;
        homeClub.goalDifference -= results[index].homeGoals - results[index].awayGoals

        awayClub.gamesPlayed--;
        awayClub.goalDifference -= results[index].awayGoals - results[index].homeGoals

        if (results[index].homeGoals > results[index].awayGoals) {
            homeClub.points -= 3;
            homeClub.wins--;
            awayClub.losses--;
        } else if (results[index].homeGoals < results[index].awayGoals) {
            awayClub.points -= 3;
            awayClub.wins--;
            homeClub.losses--;
        } else {
            homeClub.points--;
            awayClub.points--;
        }

        let homeIndex = updatedClubs.findIndex((value) => value.name == results[index].home.name)!
        let awayIndex = updatedClubs.findIndex((value) => value.name == results[index].away.name)!

        updatedClubs[homeIndex] = homeClub;
        updatedClubs[awayIndex] = awayClub;

        let newResults = [...results]
        newResults.splice(index, 1)

        setClubs(updatedClubs);

        let newClubs = [...availableClubs]
        newClubs.push(homeClub, awayClub);
        setAvailableClubs(newClubs)

        return newResults;
    }

    function onEditResult(index: number) {
        setEditResultIndex(index)
        setOpenResultModal(!openResultModal);
    }

    function onHomeChange(e: any) {
        setForm({...resultForm, home: e.currentTarget.value})
    }

    function onAwayChange(e: any) {
        setForm({...resultForm, away: e.currentTarget.value})
    }

    function onHomeGoalChange(e: any) {
        setForm({...resultForm, homeGoals: e.currentTarget.value})
    }

    function onAwayGoalChange(e: any) {
        setForm({...resultForm, awayGoals: e.currentTarget.value})
    }

    function onComment() {
        setComments([...comments, {
            name: user!.email!,
            comment: commentForm,
            createdAt: new Date()
        }])
    }

    function onCommentDelete(index: number) {
        let newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
    }

    function onCommentEdit(index: number) {
        setEditCommentIndex(index)
        setOpenCommentModal(!openCommentModal);
    }

    function handleCommentEdit(editedCommentText: string, index: number) {
        let newComments = [...comments]
        let editedComment = newComments[index];
        editedComment.comment = editedCommentText;
        newComments[index] = editedComment;
        setComments(newComments)
        setOpenCommentModal(false);
    }

    function handleResultEdit(editResult: ResultModel, index: number) {
        let newResults = onDeleteResult(index);
        addResult({
            home: editResult.home.name,
            homeGoals: editResult.homeGoals,
            away: editResult.away.name,
            awayGoals: editResult.awayGoals
        }, newResults)
        setOpenResultModal(false)
    }

    return (
        <div>
            <Card style={{padding: 25}}>
                {
                    (isAuthenticated && isAdmin(user?.email)) &&
                    <Card.Header>
                        <Button onClick={() => setShow(!show)} disabled={availableClubs.length === 0}>Add new
                            result</Button>
                        {show && <Card style={{padding: 15}}>
                            <Form onSubmit={onSubmit}>
                                <Card style={{padding: 15, marginBottom: 10}}>
                                    <Form.Group controlId="home">
                                        <Form.Label>
                                            Home team:
                                        </Form.Label>
                                        <Form.Select value={resultForm.home} onChange={onHomeChange}>
                                            {availableClubs.map((value, index, array) => {
                                                return (
                                                    <option>{value.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="homeGoals">
                                        <Form.Label>
                                            Home goals:
                                        </Form.Label>
                                        <Form.Control type="number" value={resultForm.homeGoals}
                                                      onChange={onHomeGoalChange}/>

                                    </Form.Group>
                                </Card>
                                <Card style={{padding: 15, marginBottom: 10}}>
                                    <Form.Group controlId="away">
                                        <Form.Label>
                                            Away team:
                                        </Form.Label>
                                        <Form.Select value={resultForm.away} onChange={onAwayChange}>
                                            {availableClubs.map((value, index, array) => {
                                                return (
                                                    <option>{value.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="awayGoals">
                                        <Form.Label>
                                            Away goals:
                                        </Form.Label>
                                        <Form.Control type="number" value={resultForm.awayGoals}
                                                      onChange={onAwayGoalChange}/>
                                    </Form.Group>
                                </Card>
                                <Button type="button" value="Add" onClick={onSubmit}
                                        disabled={availableClubs.length === 0}>Add</Button>
                            </Form>
                        </Card>}
                    </Card.Header>
                }
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Home</th>
                            <th>Home goals</th>
                            <th>Away goals</th>
                            <th>Away</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            results.map((result, index) =>
                                <tr key={index}>
                                    <td>{result.home.name}</td>
                                    <td>{result.homeGoals}</td>
                                    <td>{result.awayGoals}</td>
                                    <td>{result.away.name}</td>
                                    {
                                        isAdmin(user?.email) &&
                                        <td>
                                            <Button variant="danger" onClick={() => {
                                                let newResults = onDeleteResult(index);
                                                setResults(newResults);
                                            }}>Delete</Button>
                                            <Button variant="warning" onClick={() => onEditResult(index)}>Edit</Button>
                                        </td>
                                    }
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    {
                        isAuthenticated &&
                        <Button style={{margin: 25}} onClick={() => setOpenCommentForm(!openCommentForm)}>Add new
                            comment</Button>
                    }
                    {
                        openCommentForm &&
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="home">
                                        <Form.Label>
                                            Comment:
                                        </Form.Label>
                                        <input type="textarea" name="comment"
                                               onChange={(event) => setCommentForm(event.currentTarget.value)}/>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={() => onComment()}>Post comment</Button>
                            </Card.Footer>
                        </Card>
                    }
                    <Card>
                        <Card.Header>Comments</Card.Header>
                        <Card.Body>
                            {
                                comments.map((value, index, array) => {
                                    return (
                                        <Comment key={index} name={value.name} comment={value.comment} index={index}
                                                 createdAt={value.createdAt} onDelete={onCommentDelete}
                                                 onEdit={onCommentEdit}/>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                </Card.Footer>
                <CommentEditModal onEdit={handleCommentEdit} comment={comments[editCommentIndex]}
                                  index={editCommentIndex}
                                  show={openCommentModal} setShow={setOpenCommentModal}/>
                <ResultEditModal onEdit={handleResultEdit} result={results[editResultIndex]} index={editResultIndex}
                                 show={openResultModal} setShow={setOpenResultModal}/>
            </Card>
            <Card>
                <Schedules/>
            </Card>
        </div>
    )
}
