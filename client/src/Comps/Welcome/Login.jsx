import React from 'react'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { useState } from 'react';
import './welcome.css';
import { useHistory, Link } from "react-router-dom"
import { domain } from '../../config'
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

export default function Login({ setIsOpen, setToken, setAdmin }) {
    let history = useHistory()
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        try {
            const res = await fetch(domain + '/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ userName, password })
            })
            const data = await res.json()
            let success = data.success
            let admin = data.admin
            let id = data.id
            if (success) {
                localStorage.setItem('user', JSON.stringify({ id, userName, password }))
                setToken(userName)
                history.push('/home')
            }
            else if (admin) {
                localStorage.setItem('admin', JSON.stringify({ userName, password }))
                setAdmin(userName)
                alert(data.message)
                history.push('/home')

            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='mega-form'>

            <div className='sign-up-form demoObject'>
                <div >
                    <h3>Vacanza</h3>
                    <BeachAccessIcon className='umbrella'/>
                </div>
                <Input type='text'
                    value={userName}
                    onChange={(event) => { setuserName(event.target.value) }}
                    className='my-input'
                    placeholder='User Name' />
                <Input type="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    placeholder='Password'
                    className='my-input' />
                <div className='sign-up-btn forget-password'>
                    <Button onClick={login} >Login</Button>
                    <div className='forget-password'>
                        <Link to='signup' onClick={() => { setIsOpen(false) }}>dont have an account ? Register Here</Link>
                    </div>
                </div>

            </div>

        </div>
    )
}
