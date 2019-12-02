import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";
import {Button, ModalBody} from "reactstrap";
import userConstants from "../admin/Users/UserConstants";
import errorConstantsValidator from "../../services/validator/ErrorConstantsValidator";
import emailValidator from "../../services/validator/EmailValidator";
import passwordValidator from "../../services/validator/PasswordValidator";
import toast from "../../services/toast/ToastService";
import axiosService from "../../services/axios/AxiosService";
import {API_URL} from "../../constants/Api";
import axios from "axios";
import responseCodes from "../../services/axios/ResponseCodes";

export class ProfileData extends React.Component {

    state = {

        formFields: {
            firstname: '',
            lastname: '',
            uniqueNumber: '-',
        },

        formErrors: {
            firstname: false,
            lastname: false,
        },
    };

    componentDidMount() {
        if(this.props.user) {
            let formFields = this.state.formFields;
            formFields.firstname = this.props.user.firstName;
            formFields.lastname = this.props.user.lastName;
            formFields.uniqueNumber = this.props.user.uniqueNumber ? this.props.user.uniqueNumber : "-";
            this.setState(formFields);
        }
    }

    handleOnChange = e => {
        e.preventDefault();

        const {id, value} = e.target;

        let formFields = this.state.formFields;
        formFields[id] = value;
        this.setState(formFields);
        this.validateField(id, value);
    };

    validateField = (id, value) => {
        let formErrors = this.state.formErrors;

        switch (id) {
            case "firstname":
                formErrors.firstname =
                    value.length < 3 ? "Imie powinno mieć co najmniej 2 znaki" : "";
                break;
            case "lastname":
                formErrors.lastname =
                    value.length < 3 ? "Nazwisko powinno mieć co najmniej 2 znaki" : "";
                break;
            default:
                break;
        }

        let newState = Object.assign({}, this.state);
        newState.formErrors = formErrors;
        this.setState(newState);
    };

    formValid = () => {
        let valid = true;

        let fields = this.state.formFields;


        var self = this;
        Object.keys(fields).forEach(function (key) {
            self.validateField(key, fields[key]);
        });
        let formErrors = this.state.formErrors;
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });

        return valid;
    };

    handleFormSubmit = (e) => {

        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "firstName": this.state.formFields.firstname,
            "lastName": this.state.formFields.lastname,
        };

        var url = API_URL + "auth/me/profile";

         axios.patch(url, params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success(responseCodes.message.userProfileUpdate);
                }
            })
            .catch((reason) => {

                axiosService.handleError(reason);
            });
    };

    handleOnChange = e => {
        e.preventDefault();

        const {id, value} = e.target;

        let formFields = this.state.formFields;
        formFields[id] = value;
        this.setState(formFields);
        this.validateField(id, value);
    };





    render() {

        return (
            <div className="card border-0">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstname">Numer Indeksu</label>
                                    <input type="text"
                                           className={"form-control"}
                                           value={this.state.formFields.uniqueNumber}
                                           placeholder="Wprowadź imię"
                                            disabled={true}
                                    ></input>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstname">Imię</label>
                                    <input type="text"
                                           className={"form-control " + (this.state.formErrors.firstname ? "is-invalid" : '')}
                                           id="firstname" onChange={this.handleOnChange}
                                           aria-describedby="emailHelp"
                                           value={this.state.formFields.firstname}
                                           placeholder="Wprowadź imię"></input>
                                    <div className="invalid-feedback">{this.state.formErrors.firstname}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Nazwisko</label>
                                    <input type="text"
                                           className={"form-control " + (this.state.formErrors.lastname ? "is-invalid" : '')}
                                           id="lastname" onChange={this.handleOnChange}
                                           value={this.state.formFields.lastname}
                                           placeholder="Wprowadź Nazwisko"></input>
                                    <div className="invalid-feedback">{this.state.formErrors.lastname}</div>
                                </div>
                            </form>
                            <Button color={"primary"}
                                    onClick={this.handleFormSubmit}
                            >
                                Zapisz
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProfileData;


