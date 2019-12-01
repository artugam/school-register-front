import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import passwordValidator from "../../../services/validator/PasswordValidator";

export class UserPasswordModal extends React.Component {

    state = {
        formFields: {
            password: '',
            passwordConfirm: '',
        },

        formErrors: {
            password: false,
            passwordConfirm: false,
        },
    };

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
            case "password":
                if (!value) {
                    formErrors.password = errorConstantsValidator.required;
                } else if (!passwordValidator.isPasswordValidate(value)) {
                    formErrors.password = errorConstantsValidator.passwordRequirements;
                } else {
                    formErrors.password = ''
                }
                break;
            case "passwordConfirm":
                if (!value) {
                    formErrors.passwordConfirm = errorConstantsValidator.required;
                } else if (value !== this.state.formFields.password) {
                    formErrors.passwordConfirm = errorConstantsValidator.passwordsNotTheSame;
                } else {
                    formErrors.passwordConfirm = ''
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
            "password": this.state.formFields.password,
        };

        var url = API_URL + "users/" + this.props.user.id + "/password";

        axios.patch(url, params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Hasło zostało zapisane")
                    this.props.toggleModal();
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
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader tag={'h3'} toggle={this.props.toggleModal}>
                    Zmiana hasła
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="password">Hasło</label>

                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.password ? "is-invalid" : '')}
                                   id="password"
                                   onChange={this.handleOnChange}
                                   value={this.state.formFields.password}
                                   placeholder="Wprowadź hasło" />
                            <div className="invalid-feedback"
                                 dangerouslySetInnerHTML={{__html: this.state.formErrors.password}}></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Powtórz Hasło</label>
                            <input
                                   type="text"
                                   className={"form-control " + (this.state.formErrors.passwordConfirm ? "is-invalid" : '')}
                                   id="passwordConfirm"
                                   onChange={this.handleOnChange}
                                   value={this.state.formFields.passwordConfirm}
                                   placeholder="Powtórz hasło" />
                            <div className="invalid-feedback">{this.state.formErrors.passwordConfirm}</div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"}
                            onClick={this.handleFormSubmit}
                    >
                        Zapisz
                    </Button>
                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default UserPasswordModal;


