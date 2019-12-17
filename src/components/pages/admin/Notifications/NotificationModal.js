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
        courses: [],
        groups: [],
        subjects: []
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

        const {id, value} = e.target;

        if(value){
            this.loadGroups(value);
        }

    };

    loadGroups = (courseId, force = true) => {
        this.setState({subjects: []})
        var config = axiosService.getAuthConfig();
        axios.get(API_URL + "courses/" + courseId + "/groups/all", config)
            .then(response => {
                this.setState({groups: response.data});
                if(response.data.length > 0) {
                    var formFields = this.state.formFields;
                    if(true === force) {
                        formFields.groupId = response.data[0].id;
                    }
                    this.setState(formFields);
                    this.loadSubjects(formFields.groupId);
                }
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    loadSubjects = (subjectId) => {
        var config = axiosService.getAuthConfig();
        axios.get(API_URL + "groups/" + subjectId + "/subjects/all", config)
            .then(response => {
                this.setState({subjects: response.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }


    handleOnChangeGroup = e => {
        this.handleOnChange(e);

        const {id, value} = e.target;
        if(value){
            this.loadSubjects(value);
        }
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
        if (this.state.formFields.courseId == '') {
            this.state.formFields.courseId = this.props.courses[0] ? this.props.courses[0].id : '';
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
            return;
        }
        var course = false;
        if(this.props.courses.length) {
            course = this.props.courses[0].id;
        }
        if(this.state.formFields.courseId) {
            course = this.state.formFields.courseId;
        }
        if(false !== course) {
            this.loadGroups(course);
        }
    }

    updateStateWithRecord() {
        var formFields = {
            description: this.props.record.description,
            courseId: this.props.record.course ? this.props.record.course.id : '',
            groupId: this.props.record.group ? this.props.record.group.id : '',
            subjectId: this.props.record.subject ? this.props.record.subject.id : '',
        };
        let newState = Object.assign({}, this.state);
        newState.formFields = formFields;
        this.setState(newState);

        this.loadGroups(formFields.courseId, false);
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
                                <option
                                    key="empty"
                                    value=""
                                >
                                </option>
                                {this.props.courses.map((course) => {
                                    return <option
                                        key={course.id}
                                        value={course.id}
                                        >
                                            {course.name} | {course.form} | {course.degree} | {this.getStartDate(course.startDate)}
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
                                onChange={this.handleOnChangeGroup}
                                value={this.state.formFields.groupId}
                                placeholder="Wprowadź hasło"
                            >
                                <option
                                    key="empty"
                                    value=""
                                >
                                </option>
                                {this.state.groups.map((group) => {
                                    return <option
                                        key={group.id}
                                        value={group.id}
                                    >
                                        {group.name}
                                    </option>
                                })
                                }
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
                                <option
                                    key="empty"
                                    value=""
                                >
                                </option>
                                {this.state.subjects.map((subject) => {
                                    return <option
                                        key={subject.id}
                                        value={subject.id}
                                    >
                                        {subject.name}
                                    </option>
                                })
                                }
                            </select>
                            <div className="invalid-feedback">{this.state.formErrors.subjectId}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Treść powiadomienia</label>
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


