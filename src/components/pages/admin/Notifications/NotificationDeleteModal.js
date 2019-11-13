import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

export class NotificationDeleteModal extends React.Component {

    handleFormSubmit = (e) => {
        axios.delete(API_URL + "notifications/" + this.props.record.id, axiosService.getAuthConfig())
            .then(response => {
                if(response.status == 200) {
                    toast.success("Powiadomienie zostało usunięte");
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
                    Usunięcie powiadomienia
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć to powiadomienie?
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
// UserDeleteModal.propTypes = {
//     user: PropTypes.object.isRequired
// };

export default NotificationDeleteModal;



