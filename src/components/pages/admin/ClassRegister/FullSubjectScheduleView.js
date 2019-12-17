import React from 'react';
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import FullSubjectScheduleTableHeader from "./FullSubjectScheduleTableHeader";
import FullSubjectScheduleRow from "./FullSubjectScheduleRow";
import toast from "../../../services/toast/ToastService";
import userConstants from "../Users/UserConstants";
import {NotificationModal} from "../Notifications/NotificationModal";
import FullGradeDeleteSection from "./FullGradeDeleteSection";
import FullSubjectNotificationModal from "./FullSubjectNotificationModal";
import CourseStudentAddModal from "../CourseDetails/CourseStudentAddModal";
import CourseStudentAddFileModal from "../CourseDetails/CourseStudentAddFileModal";
import Collapse from 'react-css-collapse';


export class FullSubjectScheduleView extends React.Component {

    state = {
        isModalOpen: false,
        isNotificationModalOpen: false,
        records: {},
        loaded: false,
        optionsLoaded: false,
        options: [],
        fullSchedule: {},
        presences: {},
        collapse: true
    };

    loadRecords = () => {
        axios.get(API_URL + "subjects/" + this.props.subject.id + "/schedule/full", axiosService.getAuthConfig())
            .then(response => {
                this.setState({fullSchedule: response.data})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };


    componentDidMount() {
        this.loadRecords();
        this.loadOptions();
    }

    loadOptions = () => {
        var config = axiosService.getAuthConfig();

        return axios.get(API_URL + "presence/configuration/options", config)
            .then(response => {
                if (!this.state.optionsLoaded) {
                    this.setState({optionsLoaded: true})
                }
                var out = {
                    types: response.data.types
                };
                this.setState({options: out});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    handlePresenceChange = (id, value) => {
        var presences = this.state.presences;
        presences[id] = value;

        this.setState(presences);
    };


    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    toggleNotificationModal = () => {
        this.setState({
            isNotificationModalOpen: !this.state.isNotificationModalOpen
        })
    };

    handleSave = () => {
        var config = axiosService.getAuthConfig();
        var params = [];

        var presences = this.state.presences;

        Object.keys(this.state.presences).forEach(function (key, index) {
            params.push({
                schedulePresenceId: parseInt(key),
                status: presences[key]
            })
        });

        axios.post(API_URL + "presence/update/all", params, config)
            .then(response => {
                if (response.status == 200) {
                    toast.success("Zapisano");
                }
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    handleCollapse = () => {
        this.setState({collapse: !this.state.collapse})
    }


    render() {

        return (
            <div className="card shadow">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                <a href={
                                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                                     "/groups/" + this.props.subject.group.id + "/subjects/"
                                        : '/profile'
                                }>
                                    <i className="fa fa-arrow-left"></i>
                                </a>
                                &nbsp; Przedmiot
                                - <b>{this.props.subject.name} - {this.props.subject.group.name} - {this.props.subject.group.course.name}</b>
                            </h2>
                        </div>
                        {
                            this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                                <div className="col text-right">

                                    <button onClick={this.toggleNotificationModal} className="btn btn-sm btn-primary">
                                        Dodaj Powiadomienie
                                    </button>
                                    <FullSubjectNotificationModal
                                        isOpen={this.state.isNotificationModalOpen}
                                        toggleModal={this.toggleNotificationModal}
                                        subject={this.props.subject}
                                    />

                                    <button onClick={this.handleSave} className="btn btn-sm btn-primary">
                                        Zapisz
                                    </button>
                                </div>
                                : ''
                        }
                    </div>
                </div>
                <Collapse isOpen={this.state.collapse}>
                {this.state.fullSchedule.schedules ?
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush table-bordered text-center">
                            <thead className="thead-light">
                            <tr>
                                {
                                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                                        <SortTableHeader text={"Student"}/>
                                        : ''
                                }

                                {
                                    this.state.fullSchedule.schedules.map((schedule) => {
                                        return <FullSubjectScheduleTableHeader
                                            key={schedule.id}
                                            schedule={schedule}
                                            options={this.state.options}
                                            subject={this.props.subject}
                                            roles={this.props.roles}
                                        />
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody className="tbody-dark">
                            {
                                this.state.fullSchedule.rows.map((row, key) => {
                                    return <FullSubjectScheduleRow
                                        key={key}
                                        record={row}
                                        options={this.state.options}
                                        handlePresenceChange={this.handlePresenceChange}
                                        roles={this.props.roles}
                                    />
                                })
                            }
                            </tbody>
                        </table>
                        {this.state.fullSchedule.schedules.length > 0 ? '' :
                            <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>
                        }
                    </div>

                    : ''

                }
                </Collapse>
                {
                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                        <div className="text-right">
                            <button
                                onClick={this.handleCollapse}
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className={"fa fa-arrow-" + (this.state.collapse ? "up" : "down")}></i>
                            </button>
                        </div>
                        : ''
                }

            </div>
        )
    }
}

export default FullSubjectScheduleView;


