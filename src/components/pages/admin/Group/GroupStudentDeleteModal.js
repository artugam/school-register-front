import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

export class GroupStudentDeleteModal extends React.Component {

    handleFormSubmit = (e) => {

        var config = axiosService.getAuthConfig();
        config.data = {
            studentsIds: [
                this.props.record.id
            ]
        };


        axios.delete(API_URL + "groups/" + this.props.group.id + "/students", config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Student został usunięty z grupy")
                    this.props.toggleModal();
                    this.props.loadRecords();
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
                    Usunięcie studenta z grupy
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć
                    studenta <b>{this.props.record.firstName} {this.props.record.lastName}</b> z
                    grupy <b>{this.props.group.name}</b>?
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

export default GroupStudentDeleteModal;



