import React from 'react';
import '../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css'
import {API_URL} from "../constants/Api";
import axios from 'axios'
import toast from "../services/toast/ToastService";
import axiosService from "../services/axios/AxiosService"
import emailValidator from "../services/validator/EmailValidator";
import errorConstantsValidator from "../services/validator/ErrorConstantsValidator";
import globalConstants from "../constants/Global";
import responseCodes from "../services/axios/ResponseCodes";

export class Login extends React.Component {

    componentDidMount() {
        if(localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/dashboard');
        }
    }

    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    };

    validate = () => {

        let errors = [];

        errors.push(this.isEmailValidate());
        errors.push(this.isPasswordValidate());


        return !errors.includes(false);

    };

    isEmailValidate = () => {
        if (!this.state.email) {
            this.setState({emailError: errorConstantsValidator.required});
            return false;
        }
        if (!emailValidator.isEmail(this.state.email)) {
            this.setState({emailError: errorConstantsValidator.badEmail});
            return false;
        }
        this.setState({emailError: ''});
        return true;
    };

    isPasswordValidate = () => {
        if (!this.state.password) {
            this.setState({passwordError: errorConstantsValidator.required});
            return false;
        }
        this.setState({passwordError: ''});
        return true;
    };

    onLoginFormSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) {
            return;
        }

        axios.post(API_URL + "auth/login", this.state)
            .then(res => {
                if (!res) {
                    return;
                }
                toast.success(responseCodes.message.logged);
                localStorage.setItem(globalConstants.authData, JSON.stringify(res.data));
                this.props.history.push("/dashboard");
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
                                    <span className="input-group-text input-group-text-login"><i
                                        className="fa fa-user"></i></span>
                                </div>
                                <input type="email" name='email'
                                       className={`form-control pl-1 login-field ` + (this.state.emailError ? "is-invalid" : '')}
                                       placeholder="Email" value={this.state.email}
                                       onChange={this.handleEmailChange}></input>
                                {/*<input required type="email" name='email' className={`form-control pl-1 login-field`} placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>*/}
                                <div className="invalid-feedback">{this.state.emailError}</div>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-login "><i
                                        className="fa fa-key"></i></span>
                                </div>
                                <input type="password" className={`form-control pl-1 login-field ` + (this.state.passwordError ? "is-invalid" : '')} placeholder="Hasło"
                                       value={this.state.password} onChange={this.handlePasswordChange}></input>
                                <div className="invalid-feedback">{this.state.passwordError}</div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" type="submit"
                                        onClick={this.onLoginFormSubmit}>Login
                                </button>
                                {/*<input className="btn btn-block float-right login_btn" type="submit" ></input>*/}
                            </div>
                        </form>
                    </div>
                    <div className="card-footer card-footer-login">
                        {/*<div className="d-flex justify-content-center links">*/}
                        {/*    <a href="/register">Rejestracja</a>*/}
                        {/*</div>*/}
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


