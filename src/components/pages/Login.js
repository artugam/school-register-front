import React from 'react';
import '../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css'
import {API_URL} from "../constants/Api";
import axios from 'axios'


export class Login extends React.Component {

    state = {
        email: '',
        password: ''
    };

    onLoginFormSubmit = (e) =>  {
        e.preventDefault();

        axios.post(API_URL + "auth/login", this.state)
            .then(res => {
                console.log(res);
            });
    // axios.post(API_URL + "users", this.state)
    //             .then(res => {
    //                 console.log(res);
    //             });

    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        return (
            <div className="d-flex justify-content-center h-100 ">
                <div className="card auth">
                    <div className="card-header">
                        <h3>Wirtualny Dziennik</h3>
                    </div>
                    <div className="card-body align-content-center">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" onClick={this.onLoginFormSubmit}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            <a href="#">Rejestracja</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Zapomniałeś hasła?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;


