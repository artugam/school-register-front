import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

import DatePicker from "react-datepicker";
import DateTimePicker from "react-datetime-picker";
import DateTime from "react-datetime";

import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";

export class FullGradesAddModal extends React.Component {

    state = {
        formFields: {
            description: ''
        },

        formErrors: {
            description: ''
        },
    };

    addConfig = {
        title: "Dodawanie zajeć",
        saveButton: "Dodaj",
        successResponse: "Zajęcia został dodane"
    };

    editConfig = {
        title: "Edycja zajeć",
        saveButton: "Edytuj",
        successResponse: "Zajęcia został edytowane"
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
            case "description":
                formErrors.start = false;
                if (!value) {
                    formErrors.start = errorConstantsValidator.required;
                }
                break;
            default:
                break;
        }

        let newState = Object.assign({}, this.state);
        newState.formErrors = formErrors;
        this.setState(newState);
    };

    componentDidMount() {
        this.config = this.addConfig;
        if (this.props.action == 'edit') {
            this.config = this.editConfig;
            this.isEdit = true;
        }
        if (this.props.record) {
            this.updateEditStates();
        }
    }

    updateEditStates() {
        var formFields = {
            description: this.props.record.description,
        };
        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);
    }

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

        if (this.state.formFields.type === false) {
            this.state.formFields.type = this.props.options.types[0];
        }
        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }
        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "subjectId": this.props.subject.id,
            "description": this.state.formFields.description,
        };

        var url = API_URL + "subjects/"+ this.props.subject.id +"/grades/section";
        if (this.isEdit) {
            url += "/" + this.props.record.id;
            axios.patch(url, params, config)
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
            return;
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
        this.clearState();
    };

    clearState(){
        let newState = Object.assign({}, this.state);
        newState.formErrors = {};
        newState.formFields = {};
        newState.selected = [];
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
                    <div className="form-group">
                        <label htmlFor="description">Opis</label>
                        <input className={"form-control " + (this.state.formErrors.description ? "is-invalid" : '')}
                                  id="description"
                                  onChange={this.handleOnChange}
                                  value={this.state.formFields.description ? this.state.formFields.description : " "}
                                  ></input>
                        <div className="invalid-feedback">{this.state.formErrors.description}</div>
                    </div>
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

export default FullGradesAddModal;



