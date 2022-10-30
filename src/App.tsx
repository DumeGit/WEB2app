import AppRoutes from "./AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import Profile from "./profile/Profile";
import LoginButton from "./login/LoginButton";
import LogoutButton from "./login/LogoutButton";
import React, {createContext, useState} from "react";
import {ClubModel} from "./models/ClubModel";
import {useAuth0} from "@auth0/auth0-react";

interface ClubContextModel {
    clubs: ClubModel[];
    setClubs: any;
}

export const ClubContext = createContext<ClubContextModel>({
    clubs: [], setClubs: () => {
    }
});

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


export default function App() {
    const [clubs, setClubs] = useState<ClubModel[]>(initialClubs);
    const {isAuthenticated} = useAuth0();

    return (
        <BrowserRouter>
            <ClubContext.Provider value={{clubs: clubs, setClubs: setClubs}}>
                <Navbar bg="light" expand="lg" style={{display: "flex", justifyContent: "space-between"}}>
                    <Container>
                        <Navbar.Brand href="home">Football scoreboard app</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" style={{justifyContent: "space-between"}}>
                                <Nav.Link href="home">Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                    <Container style={{justifyContent: "end"}}>
                        <Navbar.Brand href=""><Profile/></Navbar.Brand>
                        {
                            isAuthenticated ?
                                <LogoutButton/>
                                :
                                <LoginButton/>}
                    </Container>
                </Navbar>
                <AppRoutes/>
            </ClubContext.Provider>
        </BrowserRouter>
    )
}
