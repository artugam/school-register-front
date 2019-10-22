import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import MultiSelect from "@khanacademy/react-multi-select";

const options = [
    {label: "One", value: 1},
    {label: "Two", value: 2},
    {label: "Three", value: 3},
];

export class CourseStudentAddModal extends React.Component {

    state = {
        options: [],
        selected: [],
    };

    componentDidMount() {

        var config = axiosService.getAuthConfig();
        axios.get(API_URL + "courses/" + this.props.course.id + "/notStudents", config)
            .then(response => {
                var out = [];
                response.data.map(item => {
                    out.push({
                        label: item.lastName + " " + item.firstName,
                        value: item.id
                    })
                });
                this.setState({options : out});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }

    handleFormSubmit = (e) => {
        var config = axiosService.getAuthConfig();
        var data = {
            studentsIds: this.state.selected
        };
        axios.post(API_URL + "courses/" + this.props.course.id + "/students", data, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Studenci zostali dodani do kierunku")
                    this.props.toggleModal();
                    this.props.loadRecords();



                    var options = this.state.options.filter(option => {
                        return this.state.selected.indexOf(option.value) === -1;
                    });

                    this.setState({selected: []})
                    this.setState({options})

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
                    Dodanie studentów do kierunku {this.props.course.name}
                </ModalHeader>
                <ModalBody>
                    {/*Czy jesteś pewny, że chcesz usunąć*/}
                    {/*studenta <b>{this.props.record.firstName} {this.props.record.lastName}</b> z*/}
                    {/*kierunku <b>{this.props.course.name}</b>?*/}
                    <label htmlFor="students">Studenci</label>
                    <MultiSelect
                        labelledBy={"students"}
                        hasSelectAll={false}
                        options={this.state.options}
                        selected={this.state.selected}
                        onSelectedChanged={selected => this.setState({selected})}
                        overrideStrings={{search: "Szukaj", selectSomeItems : "Wybierz studentów"}}


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

export default CourseStudentAddModal;



