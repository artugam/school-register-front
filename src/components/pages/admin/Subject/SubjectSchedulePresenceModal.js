import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";

export class SubjectSchedulePresenceModal extends React.Component {

    state = {
        presences: [],
        formFields: {

        },

        formErrors: {

        },
    };

    config = {
        title: "Obecności",
        saveButton: "Zapisz",
        successResponse: "Obecności zostały ustawione"
    };

    handleOnChange = e => {
        e.preventDefault();

        const {id, value} = e.target;

        let presences = this.state.presences;
        presences[id] = value;
        this.setState(presences);
    };


    componentDidMount() {
        var options = this.props.options.types;

        var presences = this.state.presences;
        this.props.subject.group.users.map((user) => {
            presences[user.id] =  options ? options[0] : "Obecny";
        });

        this.props.record.presences.map((presence) => {
            presences[presence.user.id] = presence.presenceStatus;
        });
        this.setState(presences);
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
            toast.error("Formularz zawiera błędy");
            return;
        }

        var params = [];
        this.state.presences.map((item, key) => {
            params.push({
               userId: key,
               value: item
            });

        });


        let config = axiosService.getAuthConfig(this.state.formFields);


        var url = API_URL + "schedule/" + this.props.record.id + "/presence";

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
                    {
                        this.props.subject.group.users.map((user) => {
                            return <div key={user.id} className="col">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>{user.firstName} {user.lastName}</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        {/*<h3>{this.props.subject.group.name}</h3>*/}
                                        <select
                                            type="text"
                                            className={"form-control " + (this.state.formErrors.type ? "is-invalid" : '')}
                                            id={user.id}
                                            onChange={this.handleOnChange}
                                            value={this.state.presences[user.id]}
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
                                    </div>
                                </div>
                            </div>
                        })
                    }
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

export default SubjectSchedulePresenceModal;



