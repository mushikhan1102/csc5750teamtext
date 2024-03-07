import React, {Fragment, useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import Navbar from "./components/navbar"
import ReactDOM from 'react-dom';
//import Home from "./pages/Home";
import Register from "./pages/signup";
import AuthProvider from "./context/auth";
import Login from "./pages/login";
//import Profile from './pages/Profile'
//import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';


function App() {
  return (
    <AuthProvider>
    <Router>

          <Navbar/>
      <Routes>
            <Route exact path='/signup' element={< Register />}></Route>
            <Route exact path='/login' element={< Login />}></Route>

            <Route element={<PrivateRoute />}>
                {
                    //<Route exact path='/Home' element={< Home />}></Route>
                }
                
            </Route>
            {
              //<Route exact path='/Profile' element={< Profile />}></Route>
              //<Route exact path='/Home' element={< Home />}></Route>
              //

            }
            
            
            
           

           
        </Routes>

    </Router>
    </AuthProvider>

);
}

export default App;
