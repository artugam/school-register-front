import React from 'react';
import '../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css'
import {API_URL} from "../constants/Api";
import axios from 'axios'
import toast from "../services/toast/ToastService";
import { Redirect } from 'react-router-dom'

export class Login extends React.Component {

    state = {
        email: '',
        password: ''
    };

    onLoginFormSubmit = (e) =>  {
        e.preventDefault();



        axios.post(API_URL + "auth/login", this.state)
            .then(res => {
                if(!res) {
                    return;
                }
                toast.success("Zalogowano")


                localStorage.setItem("authData", JSON.stringify(res.data));
                this.props.history.push(`/dashboard`);

                // console.log(res);
            })
            .catch((reason) => {
                toast.error(reason.response.data.message);
                // console.log(reason.response.headers);
            });
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        return (
            <div className="d-flex justify-content-center loginPage">
                <div className="card card-login auth">
                    <div className="card-header card-header-login">
                        <h3>Wirtualny Dziennik</h3>
                    </div>
                    <div className="card-body card-body-login align-content-center">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-login"><i className="fa fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control pl-1 login-field" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-login "><i className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control pl-1 login-field" placeholder="Hasło" value={this.state.password} onChange={this.handlePasswordChange}></input>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" onClick={this.onLoginFormSubmit}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer card-footer-login">
                        <div className="d-flex justify-content-center links">
                            <a href="/register">Rejestracja</a>
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


