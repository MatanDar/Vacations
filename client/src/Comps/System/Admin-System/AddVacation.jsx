import React from 'react'
import UploadPicture from './UploadPicture'
import { domain } from '../../../config'
import './style.css'
import { useHistory } from 'react-router-dom'


export default function AddVacation({ setAdminShow, editVacation, setEditVacation }) {
    const [description, setDescription] = React.useState('')
    const [destination, setDestination] = React.useState('')
    const [from_date, setFrom_date] = React.useState('')
    const [till_date, setTill_date] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [image, setImage] = React.useState('')
    let history = useHistory()

    const add = async (e) => {
        e.preventDefault()
        if (destination === '' || description === '' || from_date === '' || till_date === '' || price === '' || image === undefined) {
            alert('Must Fill all Fields')
            return
        }
        try {
            const res = await fetch(domain + '/add-vacation',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        description,
                        destination,
                        image,
                        from_date,
                        till_date,
                        price
                    })
                }
            )
            const data = await res.json()
            console.log(data);
            setAdminShow(data)
            setDescription('')
            setDestination('')
            setFrom_date('')
            setTill_date('')
            setPrice('')
            history.push('/home')
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='add-vacation-wrap'>
            <form className='add-form'>
                <h1 className='header'>Add New Vacation</h1>
                <textarea
                    className='wrap-div'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} />

                <input
                    className='wrap-div'
                    placeholder='Destination'
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value) }} />
                <input
                    className='wrap-div'
                    placeholder='From Date'
                    value={from_date}
                    onChange={(e) => { setFrom_date(e.target.value) }}
                    type='date' />
                <input
                    className='wrap-div'
                    placeholder='Till Date'
                    value={till_date}
                    onChange={(e) => { setTill_date(e.target.value) }}
                    type='date' />
                <input
                    className='wrap-div'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }} />
                <div>
                    <UploadPicture
                        className='wrap-div'
                        editVacation={editVacation}
                        setEditVacation={setEditVacation}
                        setImage={setImage}
                        image={image} />
                </div>
                <button className='add-btn' type='submit' onClick={add}>Add</button>
            </form>
        </div>
    )
}