import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";


import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";

export class FullGradeEditDescriptionModal extends React.Component {

    state = {
        formFields: {
            description: ''
        },

        formErrors: {
            description: ''
        },
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

    componentDidMount() {
        this.updateEditStates();
    }

    updateEditStates() {
        var formFields = {
            description: this.props.description,
        };
        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);
    }


    validateField = (id, value) => {
        let formErrors = this.state.formErrors;

        switch (id) {
            case "description":
                formErrors.description = false;
                if (!value) {
                    formErrors.description = errorConstantsValidator.required;
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
           "newDescription": this.state.formFields.description,
           "oldDescription": this.props.description
        };

        var url = API_URL + "subjects/" + this.props.subject.id + "/grades/name";
        axios.post(url, params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Opis został zaktualizowany")
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
                    Edycja sekcji
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="description">Nazwa sekcji</label>
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
                        Zapisz
                    </Button>

                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default FullGradeEditDescriptionModal;



