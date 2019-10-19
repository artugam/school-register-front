import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";

export class CourseDeleteModal extends React.Component {

    handleFormSubmit = (e) => {
        axios.delete(API_URL + "courses/" + this.props.record.id, axiosService.getAuthConfig())
            .then(response => {
                if(response.status == 200) {
                    toast.success("Kierunek został usunięty")
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
                    Usunięcie kierunku
                </ModalHeader>
                <ModalBody>
                    Czy jesteś pewny, że chcesz usunąć ten kierunek?
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

export default CourseDeleteModal;



