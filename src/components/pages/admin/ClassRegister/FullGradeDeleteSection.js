import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import Moment from "react-moment";

export class FullGradeDeleteSection extends React.Component {

    handleFormSubmit = (e) => {
        var config = axiosService.getAuthConfig();

        axios.delete(API_URL + "subjects/" + this.props.subject.id + "/grades/section/" + this.props.description, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Sekcja została usuniętas")
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
                    Usunięcie sekcji
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć sekcje <b>{this.props.description}</b>?
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

export default FullGradeDeleteSection;



