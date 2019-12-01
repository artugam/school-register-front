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

const ONE_WEEK = "oneWeek";
const TWO_WEEKS = "twoWeeks";

export class SubjectScheduleAddModal extends React.Component {


    options = [
        {
            value: ONE_WEEK,
            text: "Co tydzień"
        },
        {
            value: TWO_WEEKS,
            text: "Co 2 tygodnie"
        }
    ]

    state = {
        formFields: {
            start: '',
            end: '',
            description: '',
            amount: 1,
            frequency: "oneWeek",
        },

        formErrors: {
            start: '',
            end: '',
            description: '',
            amount: '',
            frequency: ''
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

    // handleChangeDateStart
    handleChangeDateStart = date => {
        let formFields = this.state.formFields;
        formFields.start = date;
        this.setState({
            formFields
        });
        this.validateField("start", date);
    }

    handleChangeDateEnd = date => {
        let formFields = this.state.formFields;
        formFields.end = date;
        this.setState({
            formFields
        });
        this.validateField("end", date);
    }

    validateField = (id, value) => {
        let formErrors = this.state.formErrors;

        switch (id) {
            case "frequency":
                formErrors.frequency = false;
                if (!value) {
                    formErrors.frequency = errorConstantsValidator.required;
                } else if (value !== TWO_WEEKS && value !== ONE_WEEK) {
                    formErrors.frequency = errorConstantsValidator.notAllowedValue;
                }
                break;
            case "amount":
                formErrors.amount = false;
                if (!value) {
                    formErrors.amount = errorConstantsValidator.required;
                } else if (value < 1) {
                    formErrors.amount = "Ilość nie może być mniejsza od 1";
                }
                break;
            case "start":
                formErrors.start = false;
                if (!value) {
                    formErrors.start = errorConstantsValidator.required;
                }
                break;
            case "end":
                formErrors.end = false;
                if (!value) {
                    formErrors.end = errorConstantsValidator.required;
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
            start: this.props.record.start,
            end: this.props.record.end,
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
            "start": this.state.formFields.start,
            "end": this.state.formFields.end,
            "amount": this.state.formFields.amount,
            "frequency": this.state.formFields.frequency,
            "subjectId": this.props.subject.id,
            "description": this.state.formFields.description,
        };

        var url = API_URL + "schedule";
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

    clearState() {
        let newState = Object.assign({}, this.state);
        newState.formErrors = {
            start: '',
            end: '',
            description: '',
            amount: '',
            frequency: ''
        };
        newState.formFields = {
            start: '',
            end: '',
            description: '',
            amount: 1,
            frequency: "oneWeek",
        };
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
                        <label htmlFor="role">Data rozpoczęcia</label>
                        <DatePicker
                            selected={Date.parse(this.state.formFields.start)}
                            onChange={this.handleChangeDateStart}
                            locale="pl"
                            className={"form-control " + (this.state.formErrors.start ? "is-invalid" : '')}
                            dateFormat="dd-MM-yyyy HH:mm"
                            timeIntervals={15}
                            showTimeSelect={true}
                            timeCaption={"Godzina"}
                        />
                        <div className="invalid-feedback"
                             style={{display: this.state.formErrors.start ? "block" : "none"}}>{this.state.formErrors.start}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Data końca</label>
                        <DatePicker
                            selected={Date.parse(this.state.formFields.end)}
                            onChange={this.handleChangeDateEnd}
                            locale="pl"
                            className={"form-control " + (this.state.formErrors.start ? "is-invalid" : '')}
                            dateFormat="dd-MM-yyyy HH:mm"
                            timeIntervals={15}
                            showTimeSelect={true}
                            timeCaption={"Godzina"}
                        />
                        <div className="invalid-feedback"
                             style={{display: this.state.formErrors.end ? "block" : "none"}}>{this.state.formErrors.end}</div>
                    </div>


                    {
                        this.props.action !== 'edit' ?
                            <div className="form-group">
                                <label htmlFor="lastname">Ilość zajęć</label>
                                <input type="number"
                                       className={"form-control " + (this.state.formErrors.amount ? "is-invalid" : '')}
                                       id="amount" onChange={this.handleOnChange}
                                       value={this.state.formFields.amount}
                                       placeholder="Wprowadź ilość zajeć"></input>
                                <div className="invalid-feedback">{this.state.formErrors.amount}</div>
                            </div>
                            : ''
                    }
                    {
                        this.props.action !== 'edit' ?
                            <div className="form-group">
                                <label htmlFor="role">Częstotliwość</label>
                                <select
                                    type="text"
                                    className={"form-control " + (this.state.formErrors.frequency ? "is-invalid" : '')}
                                    id="frequency"
                                    onChange={this.handleOnChange}
                                    value={this.state.formFields.frequency}
                                    placeholder="Rodzaj zajęć"
                                >
                                    {
                                        this.options.map((option) => {
                                            return <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.text}
                                            </option>
                                        })
                                    }
                                </select>
                                <div className="invalid-feedback">{this.state.formErrors.frequency}</div>
                            </div>
                            : ''
                        }

                    <div className="form-group">
                        <label htmlFor="description">Opis</label>
                        <textarea className={"form-control " + (this.state.formErrors.description ? "is-invalid" : '')}
                                  id="description"
                                  onChange={this.handleOnChange}
                                  value={this.state.formFields.description ? this.state.formFields.description : " "}
                        ></textarea>
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

export default SubjectScheduleAddModal;



