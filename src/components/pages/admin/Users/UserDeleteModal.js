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


export class UserDeleteModal extends React.Component {

    handleFormSubmit = (e) => {
        axios.delete(API_URL + "users/" + this.props.user.id, axiosService.getAuthConfig())
            .then(response => {
                if(response.status == 200) {
                    toast.success("Użytkownik został usunięty")
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
                    Usunięcie użytkownika
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć tego użytkownika?
                </ModalBody>
                <ModalFooter>
                    <Button color={"danger"}
                            onClick={this.handleFormSubmit}
                    >
                        Usuń
                    </Button>
                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
UserDeleteModal.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserDeleteModal;



