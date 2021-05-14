import React from 'react'
import Search from '../Search/Search'
import './style.css';
import UserVacationCard from './UserVacationCard'


export default function HomePage({ search, setSearch, vacation, setShow, setVacation, notFollowed, setnotFollowed }) {
    setShow(search)

      return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                setnotFollowed={setnotFollowed}
                setVacation={setVacation}
                vacation={vacation} />
            <UserVacationCard
                notFollowed={notFollowed}
                setShow={setShow}
                vacation={vacation}
                setVacation={setVacation}
            />
        </div>
    )
}
