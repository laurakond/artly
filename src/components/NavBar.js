import React from "react";
import { useLoggedInUser, useSetLoggedInUser } from "../contexts/LoggedInUserContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import {NavLink} from 'react-router-dom';
import axios from "axios";
import useNavBarToggle from "../hooks/useNavBarToggle";


const NavBar = () => {
    const loggedInUser = useLoggedInUser();
    const setLoggedInUser = useSetLoggedInUser();
    const {expanded, setExpanded, ref} = useNavBarToggle();

    // Function that handles signout functionality
    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setLoggedInUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Icons to show when the user is logged in
    const loggedInIcons = (
        <>
            <NavLink className={styles.NavLink} to='artworks/create'>
                Create Artwork
            </NavLink>
            {loggedInUser?.username}
            <NavLink className={styles.NavLink} to='/' onClick={handleSignOut}>
                Sign out
            </NavLink>
        </>
    )

    // Icons to show when the user is logged out
    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} to='/signup'>
                Sign up
            </NavLink>
            <NavLink className={styles.NavLink} to='/signin'>
                Sign in
            </NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand>
                        Artly
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    onClick={()=> setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav" 
                />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink className={styles.NavLink} to='/'>
                        Home
                    </NavLink>
                    {loggedInUser ? loggedInIcons : loggedOutIcons}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
