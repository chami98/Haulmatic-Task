import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const isAuthenticated = sessionStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/signin" element={
            !isAuthenticated ?
              <SignIn /> : <Navigate to="/" />
          } />
          <Route
            exact
            path="/"
            element={
              isAuthenticated ?
                <Home /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
