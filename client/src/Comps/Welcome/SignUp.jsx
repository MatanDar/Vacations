import React from 'react'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, Link } from "react-router-dom"
import { domain } from '../../config'
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


export default function SignUp({ setIsOpen }) {
    let history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        try {
            const res = await fetch(domain + '/signup', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, userName, password })
            })
            console.log(firstName, lastName, userName, password);
            const data = await res.json()
            if (!data.status) {
                alert('user name is taken')
                return
            }
            else {
                history.push('/login')
                setIsOpen(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <div className='mega-form' >
            <div className='sign-up-form demoObject'>
                <div>
                    <BeachAccessIcon className='umbrella' />
                    <h3>SIGN UP </h3>
                </div>
                <Input type='text' value={firstName} onChange={(event) => { setFirstName(event.target.value) }}
                    className='my-input'
                    placeholder='First Name' />
                <Input type="text" value={lastName} onChange={(event) => { setLastName(event.target.value) }}
                    placeholder='Last Name'
                    className='my-input' />
                <Input type="text" value={userName} onChange={(event) => { setuserName(event.target.value) }}
                    placeholder='User-Name'
                    className='my-input' />
                <Input type='password' value={password} onChange={(event) => { setPassword(event.target.value) }}
                    placeholder='Password'
                    className='my-input' />
                <div className='sign-up-btn'>
                    <Button onClick={register} >Sign-Up</Button>
                </div>
                <div className='forget-password' >
                    <p>Already Have A User ? </p>
                    <Link to='login' onClick={() => { setIsOpen(true) }}>Login</Link>
                </div>
            </div>


        </div>
    )
}
