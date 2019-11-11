import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import MultiSelect from "@khanacademy/react-multi-select";
import userConstants from "../Users/UserConstants";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import emailValidator from "../../../services/validator/EmailValidator";
import passwordValidator from "../../../services/validator/PasswordValidator";


export class GroupSubjectsAddModal extends React.Component {

    state = {
        options: [],
        selected: [],
        formFields: {
            name: '',
            hours: '',
            type: false,
        },

        formErrors: {
            name: '',
            hours: '',
            type: false,
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
            case "name":
                formErrors.nazwa =
                    value.length < 3 ? "Nazwa powinno mieć co najmniej 2 znaki" : "";
                break;
            case "hours":
                formErrors.hours =
                    isNaN(value) ? "Wprowadź poprawną ilość godzin" : "";
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
            name: this.props.record.name,
            hours: this.props.record.hours,
            type: this.props.record.type,
        };

        var selected = [];

        this.props.record.teachers.map((user) => {
           selected.push(user.id);
        });

        let newState = Object.assign({}, this.state);
        newState.selected = selected;
        newState.formFields = formFields;
        this.setState(newState);
    }

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

        if (this.state.formFields.type === false) {
            this.state.formFields.type = this.props.options.types[0];
        }
        if (!this.formValid()) {
            console.log(this.state);
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "name": this.state.formFields.name,
            "hours": parseInt(this.state.formFields.hours),
            "type": this.state.formFields.type,
            "groupId": this.props.group.id,
            "teachersIds": this.state.selected
        };

        var url = API_URL + "subjects";
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
                    <div className="form-group">
                        <div className="form-group">

                            <label htmlFor="firstname">Nazwa</label>

                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.name ? "is-invalid" : '')}
                                   id="name" onChange={this.handleOnChange}
                                   aria-describedby="emailHelp"
                                   value={this.state.formFields.name}
                                   placeholder="Wprowadź imię"></input>
                            <div className="invalid-feedback">{this.state.formErrors.name}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Ilość godzin</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.hours ? "is-invalid" : '')}
                                   id="hours" onChange={this.handleOnChange}
                                   value={this.state.formFields.hours}
                                   placeholder="Wprowadź Nazwisko"></input>
                            <div className="invalid-feedback">{this.state.formErrors.hours}</div>
                        </div>

                        <label htmlFor="role">Rodzaj</label>
                        <select
                            type="text"
                            className={"form-control " + (this.state.formErrors.type ? "is-invalid" : '')}
                            id="type"
                            onChange={this.handleOnChange}
                            value={this.state.formFields.type}
                            placeholder="Rodzaj zajęć"
                        >
                            {

                                this.props.options.types ?
                                    this.props.options.types.map((role) => {
                                        return <option
                                            key={role}
                                            value={role}
                                        >
                                            {role}
                                        </option>
                                    })
                                    : ''
                            }
                        </select>
                        <div className="invalid-feedback">{this.state.formErrors.type}</div>
                    </div>
                    <label htmlFor="teachers">Prowadzący</label>
                    <MultiSelect
                        labelledBy={"teachers"}
                        hasSelectAll={false}
                        options={this.props.options.teachers}
                        selected={this.state.selected}
                        onSelectedChanged={selected => this.setState({selected})}
                        overrideStrings={{search: "Szukaj", selectSomeItems : "Wybierz prowadzących", allItemsAreSelected: "Wszystkie opcje zostały wybrane"}}
                    />
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

export default GroupSubjectsAddModal;



