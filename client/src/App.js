import './App.css';
import { React, useState } from 'react';
import Welcome from './Comps/Welcome/Welcome'
import UserSystem from './Comps/System/UserSystem';
import AdminPage from './Comps/System/Admin-System/AdminPage'

function App() {
  const [token, setToken] = useState(localStorage.getItem('user'))
  const [admin, setAdmin] = useState(localStorage.getItem('admin'))

  return (
    <div className="App">
      <div className='container'>
        {!token && !admin ?
          <Welcome
            setAdmin={setAdmin}
            setToken={setToken}
          />
          :
          token && !admin ?
            <UserSystem setToken={setToken} />
            :
            admin &&
            <AdminPage setAdmin={setAdmin} />}
      </div>
    </div>
  );
}

export default App;
