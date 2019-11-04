import React from 'react';
import './App.css';
import Login from "./components/pages/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Register} from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Courses from "./components/pages/Courses";
import CourseDetails from "./components/pages/CourseDetails";
import CourseGroups from "./components/pages/CourseGroups";
import Group from "./components/pages/Group";

function App() {
    return (
        <Router>
            {/*<div className='App'>*/}
            {/*    <div className='container-fluid'>*/}
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route exact path='/users' component={Users}/>
                    <Route exact path='/courses' component={Courses}/>
                    <Route exact path='/courses/:courseId' component={CourseDetails}/>
                    <Route exact path='/courses/:courseId/groups' component={CourseGroups}/>
                    <Route exact path='/groups/:groupId' component={Group}/>
                {/*</div>*/}
            {/*</div>*/}
        </Router>
    );
}

export default App;
