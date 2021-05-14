import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import './style.css';
import { domain } from '../../../config'

export default function DeleteVacation({ setOpen, setAdminShow, vacationId }) {

    const deleteVac = async (id) => {

        var txt;
        var r = window.confirm("Are You Sure You Want To Delete This Vacation?");
        if (r == true) {
            txt = "Delete";
        } else {
            txt = "Not To Del";
        }
        if (txt == "Delete") {

            try {
                const res = await fetch(domain + `/delete-vacation/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    })
                const data = await res.json()
                console.log(data);
                setAdminShow(data)
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            setOpen(false);
        }


    }
    return (
        <div>
            <DeleteIcon className='delete-icon' onClick={() => deleteVac(vacationId)} />
        </div>
    )
}
