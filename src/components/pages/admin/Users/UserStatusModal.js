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
import PropTypes from 'prop-types';


export class UserStatusModal extends React.Component {

    state = {
        lockReason: ''
    }

    blockConfig = {
        title: "Zablokowanie użytkownika",
        saveButton: "Zablokuj",
        description: "Czy jesteś pewny, że chcesz zablokować użytkownika",
        successResponse: "Użytkownik został zablokowany",
        action: "block"
    };

    unblockConfig = {
        title: "Odblokowanie użytkownika",
        description: "Czy jesteś pewny, że chcesz odblokować użytkownika",
        saveButton: "Odblokuj",
        successResponse: "Użytkownik został odblokowany",
        action: "unblock"
    };

    user = null;

    config = this.blockConfig;

    handleOnChange = e => {
        e.preventDefault();

        const {id, value} = e.target;

        var state = this.state;
        state[id] = value;
        this.setState(state);
    };

    componentDidMount() {
        if(this.props.action == 'unblock') {
            this.config = this.unblockConfig;
        }
    }

    handleFormSubmit = (e) => {
        var data = {};
        if(this.props.action == 'block') {
            data = {
                lockReason: this.state.lockReason
            }
        }
        axios.post(API_URL + "users/" + this.props.user.id + "/" + this.config.action, data, axiosService.getAuthConfig())
            .then(response => {
                if(response.status == 200) {
                    toast.success(this.config.successResponse)
                    this.props.toggleModal();
                    this.props.loadUsers()
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
                    {this.config.description} <b>{this.props.user.firstName} {this.props.user.lastName}</b>?
                    <br></br>
                    {
                        this.props.action == 'block' ?
                            <div className="form-group">
                                <label htmlFor="description">Powód</label>
                                <textarea className={"form-control"}
                                          id="lockReason"
                                          onChange={this.handleOnChange}
                                          value={this.state.lockReason}
                                ></textarea>
                            </div>

                            : ''
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color={"danger"}
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
UserStatusModal.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserStatusModal;



