// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Welcome from './Welcome';
import AdminPage from './AdminPage';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar /> {/* Include the NavBar component */}
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin-login' element={<Login isAdmin={true} />} />
        <Route path='/admin-page' element={<AdminPage />} />
        <Route path='/login' element={<Login />} />
       
      </Routes>
    </Router>
  );
}

export default App;
