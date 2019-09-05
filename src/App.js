import React from 'react';
import './App.css';
import Auth from "./components/pages/Auth";
import Header from "./components/layout/Header";
import Login from "./components/pages/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className='App'>
                <div className='container-fluid'>
                    {/*<Header />*/}
                    <Route exact path='/' component={Login}/>
                    <Route path='/auth' component={Auth} />
                </div>
            </div>
        </Router>
    );
}

export default App;
