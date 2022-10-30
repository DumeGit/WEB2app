import {Button, Card, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {CommentModel} from "../models/CommentModel";

interface CommentEditModalProps{
    onEdit: any;
    index: number;
    show: boolean;
    setShow: any;
    comment: CommentModel | undefined;
}

export default function CommentEditModal({onEdit, index, show, setShow, comment}: CommentEditModalProps) {
    const [editCommentForm, setEditCommentForm] = useState<string>("");
    return (
        <Modal show={show}>
            <Modal.Header>
                Edit comment
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="home">
                                <Form.Label>
                                    Comment:
                                </Form.Label>
                                <input type="textarea" name="comment" defaultValue={comment && comment.comment} onChange={(event) => setEditCommentForm(event.currentTarget.value)}/>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => onEdit(editCommentForm, index)}>Edit comment</Button>
                    </Card.Footer>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
