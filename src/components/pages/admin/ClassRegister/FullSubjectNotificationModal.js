import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import "react-datepicker/dist/react-datepicker.css";


export class FullSubjectNotificationModal extends React.Component {

    state = {
        formFields: {
            description: '',
            courseId: '',
            groupId: '',
            subjectId: '',
        },

        formErrors: {
            description: '',
            courseId: '',
            groupId: '',
            subjectId: '',
        },

    };

    addConfig = {
        title: "Dodawanie powiadomienia",
        saveButton: "Dodaj",
        successResponse: "Powiadomienie zostało dodane"
    };

    isEdit = false;

    config = this.addConfig;

    handleOnChange = e => {
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
                formErrors.description =
                    value.length < 3 ? "Opis powinnien mieć co najmniej 2 znaki" : "";
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
            "description": this.state.formFields.description,
            "courseId": this.state.formFields.courseId,
            "groupId": this.state.formFields.groupId,
            "subjectId": this.state.formFields.subjectId,
        };

        var url = API_URL + "notifications";

        var apiResposne = axios.post(url, params, config);
        apiResposne.then(response => {
            if (response.status == 200) {
                toast.success(this.config.successResponse)
                this.props.toggleModal();
                this.clearFormValues();
            }
        }).catch((reason) => {
            axiosService.handleError(reason);
        });
    };

    clearFormValues() {

        var formFields = this.state.formFields;
        formFields.description = "";
        this.setState(formFields);
    }

    componentDidMount() {
        this.config = this.addConfig;

        if (this.props.subject) {
            this.updateStateWithRecord();
            return;
        }
    }

    updateStateWithRecord() {
        var formFields = {
            description: "",
            courseId: this.props.subject.group.course ? this.props.subject.group.course.id : '',
            groupId: this.props.subject.group ? this.props.subject.group.id : '',
            subjectId: this.props.subject ? this.props.subject.id : '',
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
                            <label htmlFor="description">Treść powiadomienia</label>
                            <textarea
                                className={"form-control " + (this.state.formErrors.description ? "is-invalid" : '')}
                                id="description"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.description}
                                placeholder="Treść powiadomienia"
                            ></textarea>
                            <div className="invalid-feedback">{this.state.formErrors.description}</div>
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

export default FullSubjectNotificationModal;


