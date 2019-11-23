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

export class PasswordForgot extends React.Component {

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
        disabledButton: false
    };

    validate = () => {

        let errors = [];

        errors.push(this.isEmailValidate());
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

    onLoginFormSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) {
            return;
        }
        var params = {
            email: this.state.email
        };
        this.setState({disabledButton: true});
        axios.post(API_URL + "public/password/reset", params)
            .then(res => {
                this.setState({disabledButton: false});
                if (!res) {
                    return;
                }
                toast.success(responseCodes.message.passowrdResetEmail);
            })
            .catch((reason) => {
                this.setState({disabledButton: false});
                if(reason.response.data.message === 'User not found') {
                    toast.error(responseCodes.message.userNotFoundWithEmail);
                    return;
                }
                axiosService.handleError(reason);
            });

    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };


    render() {
        return (
            <div className="d-flex justify-content-center loginPage">
                <div className="card card-login auth">
                    <div className="card-header card-header-login">
                        <h3><a href="/">Wirtualny Dziennik</a></h3>
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
                                       onChange={this.handleEmailChange}

                                >

                                </input>
                                {/*<input required type="email" name='email' className={`form-control pl-1 login-field`} placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>*/}
                                <div className="invalid-feedback">{this.state.emailError}</div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" type="submit"
                                        onClick={this.onLoginFormSubmit}
                                        disabled={this.state.disabledButton}
                                >
                                    Wyślij przypomnienie
                                </button>
                                {/*<input className="btn btn-block float-right login_btn" type="submit" ></input>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordForgot;


