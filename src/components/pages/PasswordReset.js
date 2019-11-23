import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import FullSubjectScheduleView from "./admin/ClassRegister/FullSubjectScheduleView";
import FullGradesScheduleView from "./admin/ClassRegister/FullGradesScheduleView";
import globalConstants from "../constants/Global";
import errorConstantsValidator from "../services/validator/ErrorConstantsValidator";
import emailValidator from "../services/validator/EmailValidator";
import toast from "../services/toast/ToastService";
import responseCodes from "../services/axios/ResponseCodes";


export class PasswordReset extends React.Component {


    componentDidMount() {
        if(localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/dashboard');
        }
    }

    state = {
        password: '',
        password1: '',
        passwordError: '',
        passwordError1: '',
        disabledButton: false
    };

    validate = () => {

        let errors = [];

        errors.push(this.isPasswordValidate());
        errors.push(this.isPassword1Validate());
        return !errors.includes(false);
    };

    isPasswordValidate = () => {
        if (!this.state.password) {
            this.setState({passwordError: errorConstantsValidator.required});
            return false;
        }
        this.setState({passwordError: ''});
        return true;
    };

    isPassword1Validate = () => {
        if (!this.state.password1) {
            this.setState({passwordError1: errorConstantsValidator.required});
            return false;
        }
        this.setState({passwordError1: ''});
        return true;
    };

    handleOnChange = e => {
        e.preventDefault();

        const {id, value} = e.target;
        var toChange = {};

        toChange[id] = value;

        this.setState(toChange);
    };

    onLoginFormSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) {
            return;
        }
        if(this.state.password1 !== this.state.password) {
            toast.error(responseCodes.message.passwordsNotTheSame);
            return;
        }
        var params = {
            password: this.state.password,
            token: this.props.match.params.token
        };
        this.setState({disabledButton: true});
        axios.post(API_URL + "public/password/set", params)
            .then(res => {
                this.setState({disabledButton: false});
                if (!res) {
                    return;
                }
                toast.success(responseCodes.message.passwordChanged);
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1000);
            })
            .catch((reason) => {
                this.setState({disabledButton: false});
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
                                    <span className="input-group-text input-group-text-login "><i
                                        className="fa fa-key"></i></span>
                                </div>
                                <input id="password" type="password" className={`form-control pl-1 login-field ` + (this.state.passwordError ? "is-invalid" : '')} placeholder="Hasło"
                                       value={this.state.password} onChange={this.handleOnChange}></input>
                                <div className="invalid-feedback">{this.state.passwordError}</div>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-login "><i
                                        className="fa fa-key"></i></span>
                                </div>
                                <input id="password1" type="password" className={`form-control pl-1 login-field ` + (this.state.passwordError1 ? "is-invalid" : '')} placeholder="Powtórz hasło"
                                       value={this.state.password1} onChange={this.handleOnChange}></input>
                                <div className="invalid-feedback">{this.state.passwordError1}</div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-block float-right login_btn" type="submit"
                                        onClick={this.onLoginFormSubmit}
                                        disabled={this.state.disabledButton}
                                >
                                    Zapisz
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


export default PasswordReset;


