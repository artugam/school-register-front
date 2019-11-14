import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";
import errorConstantsValidator from "../../../services/validator/ErrorConstantsValidator";
import axiosService from "../../../services/axios/AxiosService";
import toast from "../../../services/toast/ToastService";
import {API_URL} from "../../../constants/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";


export class NotificationModal extends React.Component {

    state = {
        formFields: {
            description: '',
            courseId: '',
            groupId: '',
            subjectId: '',
        },

        formErrors: {
            description: '',
            courseId: '',
            groupId: '',
            subjectId: '',
        },
        courses: []
    };

    addConfig = {
        title: "Dodawanie powiadomienia",
        saveButton: "Dodaj",
        successResponse: "Powiadomienie zostało dodane"
    };

    editConfig = {
        title: "Edycja powiadomienia",
        saveButton: "Edytuj",
        successResponse: "Powiadomienie zostało edytowane"
    };

    isEdit = false;

    config = this.addConfig;

    handleOnChange = e => {
        const {id, value} = e.target;
        let formFields = this.state.formFields;
        formFields[id] = value;
        this.setState(formFields);
        this.validateField(id, value);
    };

    handleOnChangeCourse = e => {
        this.handleOnChange(e);

        var config = axiosService.getAuthConfig();
        axios.get(API_URL + "courses/" + this.props.course.id + "/groups/all", config)
            .then(response => {
                this.refreshRecordsList(response.data);
                if (!this.state.loaded) {
                    this.setState({loaded: true})
                }
                return response.data;
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    validateField = (id, value) => {
        let formErrors = this.state.formErrors;
        switch (id) {
            case "description":
                formErrors.description =
                    value.length < 3 ? "Opis powinnien mieć co najmniej 2 znaki" : "";
                break;
            case "courseId":
                formErrors.courseId = false;
                if (!value) {
                    formErrors.courseId = errorConstantsValidator.required;
                }
                break;
            default:
                break;
        }

        let newState = Object.assign({}, this.state);
        newState.formErrors = formErrors;
        this.setState(newState);
    };

    formValid = () => {
        let valid = true;

        let fields = this.state.formFields;

        var self = this;
        Object.keys(fields).forEach(function (key) {
            self.validateField(key, fields[key]);
        });
        let formErrors = this.state.formErrors;
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });

        return valid;
    };

    handleFormSubmit = (e) => {
        if (this.state.formFields.degree == '') {
            this.state.formFields.degree = this.props.configOptions.degrees[0];
        }
        if (this.state.formFields.form == '') {
            this.state.formFields.form = this.props.configOptions.forms[0];
        }
        if (!this.formValid()) {
            toast.error("Formularz zawiera błędy");
            return;
        }

        let config = axiosService.getAuthConfig(this.state.formFields);

        var params = {
            "description": this.state.formFields.description,
            "courseId": this.state.formFields.courseId,
            "groupId": this.state.formFields.groupId,
            "subjectId": this.state.formFields.subjectId,
        };

        var url = API_URL + "notifications";
        var apiResposne = null;
        if (this.isEdit) {
            url += "/" + this.props.record.id;
            apiResposne = axios.patch(url, params, config)
        } else {
            apiResposne = axios.post(url, params, config);
        }
        apiResposne.then(response => {
            if (response.status == 200) {
                toast.success(this.config.successResponse)
                this.props.toggleModal();
                this.props.loadRecords()
                this.clearFormValues();
            }
        }).catch((reason) => {
            axiosService.handleError(reason);
        });
    };

    clearFormValues() {
        var formFields = this.state.formFields;
        Object.keys(formFields).map((key) => {
            formFields[key] = '';
        });
        this.setState(formFields);
    }

    componentDidMount() {
        this.config = this.addConfig;
        if (this.props.action == 'edit') {
            this.config = this.editConfig;
            this.isEdit = true;
        }

        if (this.props.record) {
            this.updateStateWithRecord();
        }
    }

    updateStateWithRecord() {
        var formFields = {
            description: this.props.record.description,
            courseId: this.props.record.courseId,
            groupId: this.props.record.groupId,
            subjectId: this.props.record.subjectId,
        };
        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);
    }

    getStartDate = (date) => {

        // return new Intl.DateTimeFormat('pl', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: '2-digit'
        // }).format(date)}

        var test = new Date(date);

        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'numeric',
            literal: "-"
            // day: '2-digit'
        }).format(test)

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
                    {this.config.title}
                </ModalHeader>
                <ModalBody>
                    <form>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="name">Nazwa</label>*/}
                        {/*    <input type="text"*/}
                        {/*           className={"form-control " + (this.state.formErrors.name ? "is-invalid" : '')}*/}
                        {/*           id="name" onChange={this.handleOnChange}*/}
                        {/*           value={this.state.formFields.name}*/}
                        {/*           placeholder="Wprowadź nazwę"></input>*/}
                        {/*    <div className="invalid-feedback">{this.state.formErrors.name}</div>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="email">Ilość semestrów</label>*/}
                        {/*    <input type="number"*/}
                        {/*           className={`form-control ` + (this.state.formErrors.semesters ? "is-invalid" : '')}*/}
                        {/*           id="semesters"*/}
                        {/*           onChange={this.handleOnChange}*/}
                        {/*           value={this.state.formFields.semesters}*/}
                        {/*           placeholder="Wprowadź ilość semestrów"></input>*/}
                        {/*    <div className="invalid-feedback">{this.state.formErrors.semesters}</div>*/}
                        {/*</div>*/}
                        <div className="form-group">
                            <label htmlFor="course">Kierunek</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.courseId ? "is-invalid" : '')}
                                id="courseId"
                                onChange={this.handleOnChangeCourse}
                                value={this.state.formFields.courseId}
                                placeholder="Wprowadź hasło"
                            >
                                {this.props.courses.map((course) => {
                                    return <option
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.name} | {course.form} | {course.degree} | {this.getStartDate(course.startDate)}
                                            {/*{new Intl.DateTimeFormat('pl', {*/}
                                            {/*    year: 'numeric',*/}
                                            {/*    month: 'long',*/}
                                            {/*    day: '2-digit'*/}
                                            {/*}).format(course.startDate.toString())}}*/}

                                    </option>
                                })
                                }
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.courseId}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="course">Grupa</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.groupId ? "is-invalid" : '')}
                                id="groupId"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.groupId}
                                placeholder="Wprowadź hasło"
                            >

                                {/*{this.props.configOptions.degrees.map((value, key) => {*/}
                                {/*    return <option*/}
                                {/*        key={key}*/}
                                {/*        value={value}*/}
                                {/*    >*/}
                                {/*        {value}*/}
                                {/*    </option>*/}
                                {/*})*/}
                                {/*}*/}
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.groupId}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="course">Przedmiot</label>
                            <select
                                type="text"
                                className={"form-control " + (this.state.formErrors.subjectId ? "is-invalid" : '')}
                                id="subjectId"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.subjectId}
                                placeholder="Wprowadź hasło"
                            >

                                {/*{this.props.configOptions.degrees.map((value, key) => {*/}
                                {/*    return <option*/}
                                {/*        key={key}*/}
                                {/*        value={value}*/}
                                {/*    >*/}
                                {/*        {value}*/}
                                {/*    </option>*/}
                                {/*})*/}
                                {/*}*/}
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.subjectId}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Opis</label>
                            <textarea
                                className={"form-control " + (this.state.formErrors.description ? "is-invalid" : '')}
                                id="description"
                                onChange={this.handleOnChange}
                                value={this.state.formFields.description}
                                placeholder="Treść powiadomienia"
                            ></textarea>
                            <div className="invalid-feedback">{this.state.formErrors.description}</div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"}
                            onClick={this.handleFormSubmit}
                    >
                        {this.config.saveButton}
                    </Button>
                    <Button variant="secondary" onClick={this.props.toggleModal}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default NotificationModal;


