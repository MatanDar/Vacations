import React from 'react'
import Navbar from './User-System/NavBar/Navbar'
import { domain } from '../../config'


export default function UserSystem({ setToken }) {
    const [vacation, setVacation] = React.useState([])
    const [notFollowed, setnotFollowed] = React.useState([])
    const [show, setShow] = React.useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const [search, setSearch] = React.useState([{
        destination: '',
        from: '',
        till: ''
    }])

    React.useEffect(async () => {
        try {
            const res = await fetch(domain + `/all-vacations/${user.id}`)
            const data = await res.json()
            const resSearch = await fetch(domain + '/search', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    search,
                    user
                })
            })
            const dataSearch = await resSearch.json()
            setVacation(dataSearch)
            console.log(dataSearch);
        }

        catch (err) {
            console.log(err);
        }
    }, [show])

    return (
        <div className='wrap-nav'>
            <Navbar
                search={search}
                setSearch={setSearch}
                setnotFollowed={setnotFollowed}
                notFollowed={notFollowed}
                show={show}
                setShow={setShow}
                setToken={setToken}
                setVacation={setVacation}
                vacation={vacation}
            />

        </div>
    )
}
