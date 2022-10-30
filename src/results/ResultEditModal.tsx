import {Button, Card, Form, Modal} from "react-bootstrap";
import {ResultModel} from "../models/ResultModel";
import {useState} from "react";

interface ResultEditModalProps {
    onEdit: any;
    show: boolean;
    setShow: any;
    result: ResultModel;
    index: number;
}

export default function ResultEditModal({onEdit, index, show, setShow, result}: ResultEditModalProps) {
    const [editResult, setEditResult] = useState<ResultModel>(result)
    return (
        <Modal show={show}>
            <Modal.Header>
                Edit result
            </Modal.Header>
            <Modal.Body>
                {result &&
                    <Card style={{padding: 15}}>
                        <Form>
                            <Card style={{padding: 15, marginBottom: 10}}>
                                <Form.Group controlId="homeGoals">
                                    <Form.Label>
                                        {result.home.name + " goals:"}
                                    </Form.Label>
                                    <Form.Control type="number" defaultValue={result.homeGoals}
                                                  onChange={(event) => setEditResult({
                                                      ...result,
                                                      homeGoals: Number.parseInt(event.currentTarget.value)
                                                  })}/>

                                </Form.Group>
                            </Card>
                            <Card style={{padding: 15, marginBottom: 10}}>
                                <Form.Group controlId="awayGoals">
                                    <Form.Label>
                                        {result.away.name + " goals:"}
                                    </Form.Label>
                                    <Form.Control type="number" defaultValue={result.homeGoals}
                                                  onChange={(event) => {
                                                      debugger;
                                                      return(setEditResult({
                                                          ...result,
                                                          homeGoals: Number.parseInt(event.currentTarget.value)
                                                      }))

                                                  }}/>
                                </Form.Group>
                            </Card>
                            <Button type="button" value="Add" onClick={() => onEdit(editResult, index)}>Edit</Button>
                        </Form>
                    </Card>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
