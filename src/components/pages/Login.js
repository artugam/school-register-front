import React from 'react';
import '../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css'
import {API_URL} from "../constants/Api";
import axios from 'axios'
import toast from "../services/toast/ToastService";
import axiosService from "../services/axios/AxiosService"
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Redirect } from 'react-router-dom'


const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return 'require';
    }
};

export class Login extends React.Component {

    state = {
        email: '',
        password: '',
        emailError: ''
    };

    validate = () => {
        let emailClass = "";
        let emailError = "";
        // let passwordError = "";


        if (!this.state.email) {
            emailError = "Pole wymagane";
        }

        if (emailError) {
            this.setState({ emailError});
            return false;
        }

        return true;
    };


    onLoginFormSubmit = (e) =>  {

        // if(!this.validate()) {
        //     return;
        // }
        e.preventDefault();
        console.log(e.parent('form:first'));

        // e.checkValidity();

        return;

        axios.post(API_URL + "auth/login", this.state)
            .then(res => {
                if(!res) {
                    return;
                }
                toast.success("Zalogowano")

                localStorage.setItem("authData", JSON.stringify(res.data));
                this.props.history.push(`/dashboard`);
            })
            .catch((reason) => {
                axiosService.handleError(reason);
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
                                {/*<input required type="email" name='email' className={`form-control pl-1 login-field ` + (this.state.emailError ? "is-invalid" :'')} placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>*/}
                                <input required type="email" name='email' className={`form-control pl-1 login-field `} placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>
                                {/*<div className="invalid-feedback">{this.state.emailError}</div>*/}
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-login "><i className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control pl-1 login-field" placeholder="Hasło" value={this.state.password} onChange={this.handlePasswordChange}></input>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" type="submit" onClick={this.onLoginFormSubmit}>Login</button>
                                {/*<input className="btn btn-block float-right login_btn" type="submit" ></input>*/}
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


