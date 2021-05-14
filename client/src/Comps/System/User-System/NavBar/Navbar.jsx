import React from 'react'
import HomePage from '../HomePage/HomePage'
import './style.css';
import '../../Admin-System/mediaQuery.css';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

export default function Navbar({ search, setSearch, setToken, vacation, setShow, setVacation, show, notFollowed, setnotFollowed }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const logout = () => {
        localStorage.clear()
        setToken('')
    }
    const backToHome = () => {
        setSearch([{
            destination: '',
            from: '',
            till: ''
        }])
    }
    
    return (
        <Router>
            <div className='navbar'>
                <div className='logo2'>Vacanza</div>
                <div className='logo'>.com</div>
                <div className='user-name'>
                    <div>Welcome </div>
                    <span></span>
                    <div className='userName'> {user.userName}!</div>
                </div>
                <Link className='link' onClick={backToHome} to="/"><HomeIcon className='nav-pics'/></Link>
                <Link className='link' onClick={logout}><ExitToAppIcon className='nav-pics'/></Link>
                
            </div>
            <Switch>
                <Route path="/">
                    <HomePage
                        search={search}
                        setSearch={setSearch}
                        setnotFollowed={setnotFollowed}
                        notFollowed={notFollowed}
                        setVacation={setVacation}
                        setShow={setShow}
                        vacation={vacation}
                    />
                </Route>
            </Switch>
        </Router>
    )
}