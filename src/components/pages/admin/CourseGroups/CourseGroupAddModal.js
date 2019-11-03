import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

export class CourseGroupAddModal extends React.Component {

    state = {
        formFields: {
            name: '',
        },

        formErrors: {
            name: false,
        },

    };

    addConfig = {
        title: "Dodawanie grupy",
        saveButton: "Dodaj",
        successResponse: "Grupa została dodana"
    };

    editConfig = {
        title: "Edycja grupy",
        saveButton: "Edytuj",
        successResponse: "Grupy została edytowana"
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
            case "name":
                formErrors.firstname =
                    value.length < 3 ? "Nazwa powinna mieć co najmniej 2 znaki" : "";
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
        if (this.state.formFields.role == false) {
            this.state.formFields.role = this.props.allowedRoles[0].id;
        }
        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "name": this.state.formFields.name,
            "courseId": this.props.course.id
        };

        var url = API_URL + "groups";
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


    componentDidMount() {
        this.config = this.addConfig;
        if (this.props.action == 'edit') {
            this.config = this.editConfig;
            this.isEdit = true;
        }

        if (this.props.record) {
            this.updateStateWithUser();
        }
    }

    updateStateWithUser() {
        var formFields = {
            name: this.props.record.name,

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
                            <label htmlFor="firstname">Nazwa</label>
                            <input type="text"
                                   className={"form-control " + (this.state.formErrors.name ? "is-invalid" : '')}
                                   id="name" onChange={this.handleOnChange}
                                   value={this.state.formFields.name}
                                   placeholder="Wprowadź nazwę"></input>
                            <div className="invalid-feedback">{this.state.formErrors.name}</div>
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

export default CourseGroupAddModal;


