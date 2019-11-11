import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import MultiSelect from "@khanacademy/react-multi-select";


export class GroupStudentAddModal extends React.Component {

    state = {
        options: [],
        selected: [],
    };

    handleFormSubmit = (e) => {
        var config = axiosService.getAuthConfig();
        var data = {
            studentsIds: this.state.selected
        };
        axios.post(API_URL + "groups/" + this.props.group.id + "/students", data, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Studenci zostali dodani do grupy")
                    this.props.toggleModal();
                    this.props.loadRecords();


                    this.props.callBack(this.state.selected);

                    this.setState({selected: []})


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
                    Dodanie studentów do grupy {this.props.group.name}
                </ModalHeader>
                <ModalBody>
                    {/*Czy jesteś pewny, że chcesz usunąć*/}
                    {/*studenta <b>{this.props.record.firstName} {this.props.record.lastName}</b> z*/}
                    {/*kierunku <b>{this.props.course.name}</b>?*/}
                    <label htmlFor="students">Studenci</label>
                    <MultiSelect
                        labelledBy={"students"}
                        hasSelectAll={false}
                        options={this.props.options}
                        selected={this.state.selected}
                        onSelectedChanged={selected => this.setState({selected})}
                        overrideStrings={{search: "Szukaj", selectSomeItems : "Wybierz studentów", allItemsAreSelected: "Wszystkie opcje zostały wybrane"}}


                    />
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

export default GroupStudentAddModal;



