import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import './welcome.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom"

export default function Welcome({ setToken, setAdmin }) {
    const [isOpen, setIsOpen] = React.useState(true)
    let history = useHistory()
    React.useEffect(() => {
        history.push('/login')
    }, [])
    return (
        <div className='welcome-page'>
            {isOpen ? <Login
                setIsOpen={setIsOpen}
                setToken={setToken}
                setAdmin={setAdmin}
            />
                :
                <SignUp setIsOpen={setIsOpen} />
            }
            <Router>
                <Switch>
                    <Route path='login'>
                        <Login
                            setIsOpen={setIsOpen}
                            setToken={setToken}
                            setAdmin={setAdmin}
                        />
                    </Route>
                    <Route path='signup'>
                        <SignUp setIsOpen={setIsOpen} />

                    </Route>
                </Switch>
            </Router>


        </div>
    )
}
