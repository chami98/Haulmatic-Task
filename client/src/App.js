import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Initialize from './pages/Initialize';
import { useSelector } from 'react-redux';


function App() {

  const { isInitialized } = useSelector(state => state.app)
  console.log(isInitialized)
  const { isAuthenticated } = useSelector(state => state.app)



  let routes = null;

  if (!isInitialized) {
    routes = <Route path="*" element={<Initialize />} />
  } else {
    routes = <>
      <Route exact path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
      <Route exact path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
      {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
    </>
  }

  return (
    <>
      <Router>
        <Routes>
          {routes}
        </Routes>
      </Router>
    </>
  );
}

export default App;
