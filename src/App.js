import React from 'react';
import './App.css';
import Auth from "./components/pages/Auth";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Register} from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";

function App() {
    return (
        <Router>
            {/*<div className='App'>*/}
            {/*    <div className='container-fluid'>*/}
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                {/*</div>*/}
            {/*</div>*/}
        </Router>
    );
}

export default App;
