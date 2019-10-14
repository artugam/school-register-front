import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import emailValidator from "../../../services/validator/EmailValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import passwordValidator from "../../../services/validator/PasswordValidator";

export class CourseModal extends React.Component {

    state = {
        formFields: {
            name: '',
            degree: '',
            form: '',
            semesters: '',
        },

        formErrors: {
            name: false,
            degree: false,
            form: false,
            semesters: false
        },

    };

    addConfig = {
        title: "Dodawanie kierunku",
        saveButton: "Dodaj",
        successResponse: "Kierunek został dodany"
    };

    editConfig = {
        title: "Edycja kierunku",
        saveButton: "Edytuj",
        successResponse: "Kierunek został edytowany"
    };

    isEdit = false;

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
            case "name":
                formErrors.name =
                    value.length < 3 ? "Nazwa powinna mieć co najmniej 2 znaki" : "";
                break;
            case "semesters":
                if (!value) {
                    formErrors.semesters = errorConstantsValidator.required;
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
        if (this.state.formFields.degree == '') {
            this.state.formFields.degree = this.props.configOptions.degrees[0];
        }
        if (this.state.formFields.form == '') {
            this.state.formFields.form = this.props.configOptions.forms[0];
        }
        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "name": this.state.formFields.name,
            "semesters": this.state.formFields.semesters,
            "degree": this.state.formFields.degree,
            "form": this.state.formFields.form,
        };

        var url = API_URL + "courses";
        if (this.isEdit) {
            url += "/" + this.props.record.id;
        }

        axios.post(url, params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success(this.config.successResponse)
                    this.props.toggleModal();
                    this.props.loadRecords()

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

        if (this.props.record) {
            this.updateStateWithRecord();
        }
    }

    updateStateWithRecord() {
        var formFields = {
            name: this.record.name,
            degree: this.record.degree,
            form: this.record.form,
            semesters: this.record.semesters,
        };

        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);

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
                    {this.config.title}
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nazwa</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.name ? "is-invalid" : '')}
                                   id="name" onChange={this.handleOnChange}
                                   value={this.state.formFields.name}
                                   placeholder="Wprowadź nazwę"></input>
                            <div className="invalid-feedback">{this.state.formErrors.name}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Semesters</label>
                            <input type="number"
                                   className={`form-control ` + (this.state.formErrors.semesters ? "is-invalid" : '')}
                                   id="semesters"
                                   onChange={this.handleOnChange}
                                   value={this.state.formFields.semesters}
                                   placeholder="Wprowadź email"></input>
                            <div className="invalid-feedback">{this.state.formErrors.semesters}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Stopień</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.degree ? "is-invalid" : '')}
                                id="degree"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.degree}
                                placeholder="Wprowadź hasło"
                            >

                                { this.props.configOptions.degrees.map((value, key) => {
                                        return <option
                                            key={key}
                                            value={value}
                                        >
                                            {value}
                                        </option>
                                    })
                                }
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.degree}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Forma</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.form ? "is-invalid" : '')}
                                id="form"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.form}
                                placeholder="Wprowadź hasło"
                            >

                                { this.props.configOptions.forms.map((value, key) => {
                                    return <option
                                        key={key}
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                })
                                }
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.form}</div>
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

export default CourseModal;


