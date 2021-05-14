import React from 'react'
import './style.css';
import AdminNavbar from './AdminNavbar'
import { domain } from '../../../config'


export default function AdminPage({ setAdmin }) {

    const [open, setOpen] = React.useState(false);
    const [adminVac, setAdminVac] = React.useState([])
    const [adminShow, setAdminShow] = React.useState([])
    const [editVacation, setEditVacation] = React.useState({})

    
    React.useEffect(async () => {
        try {
            const res = await fetch(domain +`/admin`)
            const data = await res.json()
            console.log(data);
            setAdminVac(data)
        }
        catch (err) {
            console.log(err);
        }
    }, [adminShow])
  
    return (
        <div>
            <AdminNavbar  
            editVacation={editVacation}
            setEditVacation={setEditVacation}
            setAdmin={setAdmin}
            setAdminShow={setAdminShow}
            setOpen={setOpen}
            open={open}
            adminVac={adminVac}
            />
        </div>
    )
}
