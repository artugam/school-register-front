import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

export class CourseGroupDeleteModal extends React.Component {

    handleFormSubmit = (e) => {
        var config = axiosService.getAuthConfig();

        axios.delete(API_URL + "groups/" + this.props.record.id, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Grupa została usunięta")
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
                    Usunięcie grupy
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć
                    grupę <b>{this.props.record.name}</b> z
                    kierunku <b>{this.props.course.name}</b>?
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

export default CourseGroupDeleteModal;



