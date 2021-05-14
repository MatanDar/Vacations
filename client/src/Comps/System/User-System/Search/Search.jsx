import React from 'react'
import './style.css';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { domain } from '../../../../config'
import '../../Admin-System/mediaQuery.css';


export default function Search({ search, setSearch, setVacation }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const handlrChange = (e, i) => {
        const data = [...search]
        data[i][e.target.name] = e.target.value
        setSearch(data)
    }

    const sendSearch = async (e, i) => {
        try {
            const res = await fetch(domain + '/search', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ search, user })
            })
            const data = await res.json()
            setVacation(data)
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const clearSearch = () => {
        setSearch([{
            destination: '',
            from: '',
            till: ''
        }])
    }

    return (
        <div className='search-wrap'>
            {search.map((item, index) => {
                return (
                    <div
                        className='search-line'
                        key={index}>
                        <input className='input-destination search-query'
                            value={item.destination}
                            placeholder='Search Destination...'
                            type='text'
                            name='destination'
                            onChange={(e) => { handlrChange(e, index) }}
                        />

                        <input className='input-search search-query'
                            value={item.from}
                            type='date'
                            name='from'
                            onChange={(e) => { handlrChange(e, index) }}
                        />

                        <input className='input-search search-query'
                            value={item.till}
                            type='date'
                            name='till'
                            onChange={(e) => { handlrChange(e, index) }}
                        />
                        <button className='btn-search search-query' onClick={sendSearch}><SearchIcon /></button>
                        <button className='btn-clear search-query' onClick={clearSearch}><HighlightOffIcon /></button>
                    </div>
                )
            })}


        </div >

    )
}
