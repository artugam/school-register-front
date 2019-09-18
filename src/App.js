import React from 'react';
import './App.css';
import Login from "./components/pages/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Register} from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/admin/Users";

function App() {
    return (
        <Router>
            {/*<div className='App'>*/}
            {/*    <div className='container-fluid'>*/}
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route exact path='/users' component={Users}/>
                {/*</div>*/}
            {/*</div>*/}
        </Router>
    );
}

export default App;
