import React from 'react'
import AddVacation from './AddVacation'
import './mediaQuery.css';
import '../User-System/NavBar/style.css';
import Reports from './Reports/Reports'
import VacationsCard from './VacationsCard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

export default function AdminNavbar({  editVacation, setEditVacation ,setAdmin, setAdminShow, setOpen, open, adminVac }) {
    const [image, setImage] = React.useState(editVacation.pics)
    console.log(editVacation);
    const admin = JSON.parse(localStorage.getItem('admin'))

    const logout = () => {
        localStorage.clear()
        setAdmin('')
    }
    return (
        <Router>
            <div className='navbar'>
                <div className='logo2'>Vacanza</div>
                <div className='logo'>.com</div>
                <div className='user-name'>
                    <div>Welcome </div>
                    <span></span>
                    <div className='userName'>{admin.userName}! </div>
                </div>
                <Link className='link' to="/home"><HomeIcon className='nav-pics'/></Link>
                <Link className='link' to="/addVacation"><NoteAddIcon className='nav-pics'/></Link>
                <Link className='link' to="/reports"><BarChartIcon className='nav-pics'/></Link>
                <Link className='link' onClick={logout}><ExitToAppIcon className='nav-pics'/></Link>

            </div>
            <Switch>
                <Route path="/addVacation">
                    <AddVacation
                     editVacation={editVacation}
                     setEditVacation={setEditVacation}
                        setAdminShow={setAdminShow}
                    />
                </Route>
                <Route path="/reports">
                    <Reports
                        adminVac={adminVac}
                    />
                </Route>
                <Route path="/">
                    <VacationsCard
                        editVacation={editVacation}
                        setEditVacation={setEditVacation}
                        adminVac={adminVac}
                        setAdminShow={setAdminShow}
                        setOpen={setOpen}
                        open={open}
                        setImage={setImage}
                        image={image}
                    />
                </Route>
            </Switch>
        </Router>
    )
}
