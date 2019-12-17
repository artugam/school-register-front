import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import userConstants from "./UserConstants";
import axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import emailValidator from "../../../services/validator/EmailValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import passwordValidator from "../../../services/validator/PasswordValidator";
import UsersTableConstants from "../../../services/users/UsersTableConstants";

export class UserModal extends React.Component {

    state = {
        formFields: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            uniqueNumber: "",
            role: false,
        },

        formErrors: {
            firstname: false,
            lastname: false,
            email: false,
            password: false,
            uniqueNumber: false,
            roleError: false,
        },
    };

    addConfig = {
        title: "Dodawanie użytkownika",
        saveButton: "Dodaj",
        successResponse: "Użytkownik został dodany"
    };

    editConfig = {
        title: "Edycja użytkownika",
        saveButton: "Edytuj",
        successResponse: "Użytkownik został edytowany"
    };

    isEdit = false;

    user = null;

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
                    value.length < 2 ? "Imie powinno mieć co najmniej 2 znaki" : "";
                break;
            case "lastname":
                formErrors.lastname =
                    value.length < 2 ? "Nazwisko powinno mieć co najmniej 2 znaki" : "";
                break;
            case "uniqueNumber":
                var role = parseInt(this.state.formFields.role);
                if(role === 1 || role === 2) {
                    formErrors.uniqueNumber = "";

                    return;
                }
                if (!value) {
                    formErrors.uniqueNumber = errorConstantsValidator.required;
                    return;
                }
                formErrors.uniqueNumber =
                    value.length < 2 ? "Numer Indeksu powinien mieć co najmniej 2 znaki" : "";
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
                if (!value) {
                    formErrors.password = errorConstantsValidator.required;
                } else if (!passwordValidator.isPasswordValidate(value)) {
                    formErrors.password = errorConstantsValidator.passwordRequirements;
                } else {
                    formErrors.password = ''
                }
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

        if (this.isEdit) {
            delete fields['password'];
        }

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
        console.log(this.state.formFields);
        if (this.state.formFields.role == false || !this.state.formFields.role) {
            var role = userConstants.roles.ROLE_USER;
            if(this.props.config.tableName === UsersTableConstants.TEACHER) {
                role = userConstants.roles.ROLE_TEACHER;
            } else if(this.props.config.tableName === UsersTableConstants.ADMINS) {
                role = userConstants.roles.ROLE_ADMIN;
            }
            var result = this.props.allowedRoles.filter(obj => {
                return obj.name === role
            });
            this.state.formFields.role = result[0].id;
        }

        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "firstName": this.state.formFields.firstname,
            "lastName": this.state.formFields.lastname,
            "email": this.state.formFields.email,
            "password": this.state.formFields.password,
            "uniqueNumber": this.state.formFields.uniqueNumber ? this.state.formFields.uniqueNumber : " ",
            "role": this.state.formFields.role,
        };

        var url = API_URL + "users";
        if (this.isEdit) {
            url += "/" + this.user.id;
            axios.patch(url, params, config)
                .then(response => {
                    if (response.status == 200) {
                        toast.success(this.config.successResponse)
                        this.props.toggleModal();
                        this.props.loadUsers()
                    }
                })
                .catch((reason) => {
                    axiosService.handleError(reason);
                });
            return;
        }

        axios.post(url, params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success(this.config.successResponse)
                    this.props.toggleModal();
                    this.props.loadUsers()
                }
            })
            .catch((reason) => {

                axiosService.handleError(reason);
            });
    };


    componentDidMount() {
        this.config = this.addConfig;
        if (this.props.action == 'edit') {
            this.config = this.editConfig;
            this.isEdit = true;
        }

        if (this.props.user) {
            this.user = this.props.user;
            this.updateStateWithUser();
        }
    }

    updateStateWithUser() {

        var formFields = {
            firstname: this.user.firstName,
            lastname: this.user.lastName,
            email: this.user.email,
            uniqueNumber: this.user.uniqueNumber,
            password: '',
            role: this.getUserRole(this.user),
        };

        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);

    }

    getUserRole = (user) => {

        if (!user.roles.length) {
            return false;
        }

        var role = this.getRole(user);
        var outRole = false;
        this.props.allowedRoles.map((item) => {
            if(item.name === role) {
                outRole = item.id;
            }
        });
        return outRole;
    };

    getRole = (user) => {
        if(user.roles.length === 4) {
            return userConstants.roles.ROLE_ADMIN;
        }
        if(user.roles.length === 3) {
            return userConstants.roles.ROLE_TEACHER;
        }
        if(user.roles.length === 2) {
            return userConstants.roles.ROLE_SUPER_USER;
        }
        if(user.roles.length === 1) {
            return userConstants.roles.ROLE_USER;
        }
    };


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
                        <div className="form-group">
                            <label htmlFor="lastname">Numer Indeksu</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.uniqueNumber ? "is-invalid" : '')}
                                   id="uniqueNumber" onChange={this.handleOnChange}
                                   value={this.state.formFields.uniqueNumber}
                                   placeholder="Wprowadź numer indeksu"></input>
                            <div className="invalid-feedback">{this.state.formErrors.uniqueNumber}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   className={`form-control ` + (this.state.formErrors.email ? "is-invalid" : '')}
                                   id="email"
                                   onChange={this.handleOnChange}
                                   value={this.state.formFields.email}
                                   placeholder="Wprowadź email"></input>
                            <div className="invalid-feedback">{this.state.formErrors.email}</div>
                        </div>

                        {this.isEdit ? '' :
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
                                    <div className="invalid-feedback"
                                         dangerouslySetInnerHTML={{__html: this.state.formErrors.password}}></div>
                                </div>
                            </div>
                        }

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="role">Rola</label>*/}
                        {/*    <select*/}
                        {/*        type="text"*/}
                        {/*        className={"form-control " + (this.state.formErrors.role ? "is-invalid" : '')}*/}
                        {/*        id="role"*/}
                        {/*        onChange={this.handleOnChange}*/}
                        {/*        value={this.state.formFields.role}*/}
                        {/*        placeholder="Wprowadź hasło"*/}
                        {/*    >*/}
                        {/*        {*/}
                        {/*            this.props.allowedRoles.map((role) => {*/}
                        {/*                return <option*/}
                        {/*                    key={role.id}*/}
                        {/*                    value={role.id}*/}
                        {/*                >*/}
                        {/*                    {userConstants.roleNames[role.name]}*/}
                        {/*                </option>*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </select>*/}
                        {/*    <div className="invalid-feedback">{this.state.formErrors.role}</div>*/}
                        {/*</div>*/}

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


