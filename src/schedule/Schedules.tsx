import {Button, Card, Form, Table} from "react-bootstrap";
import {useContext, useState} from "react";
import {ScheduleModel} from "../models/ScheduleModel";
import {useAuth0} from "@auth0/auth0-react";
import isAdmin from "../login/LoginUtils";
import {ClubContext} from "../App";

export default function Schedules() {
    const {clubs} = useContext(ClubContext);
    const [show, setShow] = useState<boolean>(false);
    const {user, isAuthenticated} = useAuth0();

    const initialSchedules: ScheduleModel[] = [
        {
            home: clubs[0].name,
            away: clubs[4].name,
            date: new Date("11/5/2022 18:00")
        },
        {
            home: clubs[3].name,
            away: clubs[5].name,
            date: new Date("11/5/2022 21:00")
        },
        {
            home: clubs[2].name,
            away: clubs[4].name,
            date: new Date("11/6/2022 18:00")
        }
    ]
    const [schedules, setSchedules] = useState<ScheduleModel[]>(initialSchedules);

    const [scheduleForm, setScheduleForm] = useState<ScheduleModel>({
        home: "Dinamo",
        away: "Hajduk",
        date: new Date()
    });

    function onHomeChange(e: any) {
        setScheduleForm({...scheduleForm, home: e.currentTarget.value})
    }

    function onAwayChange(e: any) {
        setScheduleForm({...scheduleForm, away: e.currentTarget.value})
    }

    function onDateChange(e: any) {
        setScheduleForm({...scheduleForm, date: new Date(e.currentTarget.value)})
    }

    function onSubmit() {
        let newSchedules = [...schedules];
        newSchedules.push(scheduleForm);
        setSchedules(newSchedules)
    }

    return (
        <Card>
            <Card.Header>
                Schedule
            </Card.Header>
            <Card.Body>
                <Table>
                    <thead>
                    <tr>
                        <th>Home</th>
                        <th>Away</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.home}</td>
                                <td>{value.away}</td>
                                <td>{value.date.toLocaleString("hr-HR")}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Card.Body>
            {(isAdmin(user?.email) && isAuthenticated) && <Card.Footer>
                <Button onClick={() => setShow(!show)}>Add new schedule</Button>
                {show && <Card>
                    <Form>
                        <Card style={{padding: 15, marginBottom: 10}}>
                            <Form.Group controlId="home">
                                <Form.Label>
                                    Home team:
                                </Form.Label>
                                <Form.Select value={scheduleForm.home} onChange={onHomeChange}>
                                    {clubs.map((value, index, array) => {
                                        return (
                                            <option>{value.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="away">
                                <Form.Label>
                                    Away team:
                                </Form.Label>
                                <Form.Select value={scheduleForm.away} onChange={onAwayChange}>
                                    {clubs.map((value, index, array) => {
                                        return (
                                            <option>{value.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="away">
                                <Form.Label>
                                    Date:
                                </Form.Label>
                                <Form.Control type="date" onChange={onDateChange}/>
                            </Form.Group>
                        </Card>
                        <Button type="button" value="Add" onClick={onSubmit}>Add</Button>
                    </Form>
                </Card>}
            </Card.Footer>}
        </Card>
    )
}
