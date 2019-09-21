import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import userConstants from "./UserConstants";
import Axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import emailValidator from "../../../services/validator/EmailValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";

export class UserModal extends React.Component {

    state = {
        formFields: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: false,
        },

        formErrors: {
            firstname: false,
            lastname: false,
            email: false,
            password: false,
            roleError: false,
        },

    };

    addConfig = {
        title: "Dodawanie użytkownika",
        saveButton: "Dodaj"
    };

    editConfig = {
        title: "Edycja użytkownika",
        saveButton: "Edytuj"
    };

    config = this.addConfig;

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
            case "email":

                if (!value) {
                    formErrors.email = errorConstantsValidator.required;
                } else if (!emailValidator.isEmail(value)) {
                    formErrors.email = errorConstantsValidator.badEmail;
                } else {
                    formErrors.email = ''
                }
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Hasło powinno mieć co najmniej 6 znaków" : "";
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
        if (this.state.role == false) {
            this.state.role = this.props.allowedRoles[0].id;
        }
        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        //TODO

    };


    componentDidMount() {
        this.config = this.props.action == 'edit' ? this.editConfig : this.addConfig;
    }

    generateRandomPassword = () => {
        var generator = require('generate-password');

        var password = generator.generate({
            length: 15,
            numbers: true,
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true
        });
        let newState = Object.assign({}, this.state.formFields);
        newState.password = password;
        this.setState({formFields: newState});

        let formErrors = Object.assign({}, this.state.formErrors);
        formErrors.password = false;
        this.setState({formErrors: formErrors});
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader tag={'h3'} toggle={this.props.toggleModal}>
                    {this.config.title}
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">Imię</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.firstname ? "is-invalid" : '')}
                                   id="firstname" onChange={this.handleOnChange}
                                   aria-describedby="emailHelp"
                                   placeholder="Wprowadź imię"></input>
                            <div className="invalid-feedback">{this.state.formErrors.firstname}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Nazwisko</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.lastname ? "is-invalid" : '')}
                                   id="lastname" onChange={this.handleOnChange}
                                   placeholder="Wprowadź Nazwisko"></input>
                            <div className="invalid-feedback">{this.state.formErrors.lastname}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   className={`form-control ` + (this.state.formErrors.email ? "is-invalid" : '')}
                                   id="email"
                                   onChange={this.handleOnChange}
                                   placeholder="Wprowadź email"></input>
                            <div className="invalid-feedback">{this.state.formErrors.email}</div>
                        </div>
                        <div className="form-group">

                            <label htmlFor="password">Hasło</label>
                            <div className="input-group mb-3">
                                <input type="text"
                                       className={"form-control " + (this.state.formErrors.password ? "is-invalid" : '')}
                                       id="password"
                                       onChange={this.handleOnChange}
                                       value={this.state.formFields.password}
                                       placeholder="Wprowadź hasło"></input>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button"
                                            onClick={this.generateRandomPassword}>Losowe Hasło
                                    </button>
                                </div>
                                <div className="invalid-feedback">{this.state.formErrors.password}</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Rola</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.role ? "is-invalid" : '')}
                                id="role"
                                onChange={this.handleOnChange}
                                placeholder="Wprowadź hasło"
                            >
                                {
                                    this.props.allowedRoles.map((role) => {
                                        return <option
                                            key={role.id}
                                            value={role.id}
                                        >
                                            {userConstants.roleNames[role.name]}
                                        </option>
                                    })
                                }
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.role}</div>
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"}
                            onClick={this.handleFormSubmit}
                    >
                        {this.config.saveButton}
                    </Button>
                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default UserModal;


