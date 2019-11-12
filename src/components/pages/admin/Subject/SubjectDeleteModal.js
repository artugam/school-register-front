import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import Moment from "react-moment";

export class SubjectDeleteModal extends React.Component {

    handleFormSubmit = (e) => {
        var config = axiosService.getAuthConfig();
        config.data = {
            studentsIds: [
                this.props.record.id
            ]
        };

        axios.delete(API_URL + "schedule/" + this.props.record.id, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Przedmiot został usunięty z grupy")
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
                    Usunięcie zajęć
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć
                    zajecia
                    &nbsp;<b><Moment format="DD-MM-YYYY HH:mm">
                        {this.props.record.start}
                    </Moment></b> - <b><Moment format="DD-MM-YYYY HH:mm">
                        {this.props.record.end}
                    </Moment></b>&nbsp;
                    z grupy <b>{this.props.subject.group.name}</b>?
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

export default SubjectDeleteModal;



