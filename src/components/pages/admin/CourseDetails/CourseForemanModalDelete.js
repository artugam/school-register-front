import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";



export class CourseForemanModalDelete extends React.Component {


    handleFormSubmit = (e) => {
        var data = {
            "userId": -1
        };
        axios.post(API_URL + "courses/" + this.props.course.id + "/foreman", data, axiosService.getAuthConfig())
            .then(response => {
                if(response.status == 200) {
                    toast.success("Starosta został usunięty");
                    this.props.toggleModal();
                    this.props.loadRecords()
                    this.props.loadCourse();
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
                    Usuń starostę
                </ModalHeader>
                <ModalBody>
                    Czy na pewno chcesz usunąć starostę <b>{this.props.record.firstName} {this.props.record.lastName}</b>?
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
export default CourseForemanModalDelete;



