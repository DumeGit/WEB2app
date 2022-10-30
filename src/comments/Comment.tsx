import {Button, Card, Form} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import isAdmin from "../login/LoginUtils";
import {useState} from "react";

interface CommentProps {
    name: string;
    comment: string;
    createdAt: Date;
    index: number;
    onDelete: any;
    onEdit: any;
    key: number;
}

export default function Comment({name, comment, index, createdAt, onDelete, onEdit, key}: CommentProps) {

    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    return (
        <Card>
            <Card.Header>
                <div style={{justifyContent: "space-between"}}>
                    <div>{name}</div>
                    <div>{createdAt.toLocaleString("hr-HR")}</div>
                </div>
            </Card.Header>
            <Card.Body>{comment}</Card.Body>
            {(isAuthenticated && (isAdmin(user?.email) || user?.email === name))
                &&
                <Card.Footer>
                    <Button style={{padding:5}} variant="danger" onClick={() => onDelete(index)}>Delete</Button>
                    <Button style={{padding:5}} variant="warning" onClick={() => onEdit(index)}>Edit</Button>
                </Card.Footer>
            }
        </Card>
    );
}
