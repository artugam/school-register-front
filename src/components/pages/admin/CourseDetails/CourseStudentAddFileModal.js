import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import MultiSelect from "@khanacademy/react-multi-select";
import responseCodes from "../../../services/axios/ResponseCodes";


export class CourseStudentAddFileModal extends React.Component {

    state = {
        file: false,
    };

    handleFormSubmit = (e) => {
        var allowedExtensions = ['csv'];
        var extension = this.state.file.name.split(".").pop();

        if(!allowedExtensions.includes(extension)) {
            toast.error(responseCodes.message.notAllowedFileExtension);
            return;
        }
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("courseId", this.props.course.id);


        var config = axiosService.getAuthConfig();

        axios.post(API_URL + "users/upload/csv", formData, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Studenci zostali dodani do kierunku")
                    this.props.toggleModal();
                    this.props.loadRecords();
                }
            })
            .catch((reason) => {
                if(reason.response.data && reason.response.data.message.substr("Użytkownik o indeksie") !== -1) {
                    toast.error(reason.response.data.message);
                    return;
                }
                axiosService.handleError(reason);
            });
    };

    handleOnChange = (e) => {

        const files = Array.from(e.target.files)
        const file = files[0];
        this.setState({ file: file })
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
                    Dodanie studentów do kierunku {this.props.course.name}
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="file">Plik (.csv)</label><br/>
                    <input type='file' id='file' onChange={this.handleOnChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"}
                            onClick={this.handleFormSubmit}
                    >
                        Dodaj
                    </Button>

                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CourseStudentAddFileModal;



