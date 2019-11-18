import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import SubjectSchedule from "../Subject/SubjectSchedule";
import SubjectScheduleAddModal from "../Subject/SubjectScheduleAddModal";
import FullSubjectScheduleTableHeader from "./FullSubjectScheduleTableHeader";
import FullSubjectScheduleRow from "./FullSubjectScheduleRow";
import TablePageSelect from "../../../modules/TabePageSelect";
import toast from "../../../services/toast/ToastService";
import FullGradesAddModal from "./FullGradesAddModal";


export class FullGradesScheduleView extends React.Component {

    state = {
        isModalOpen: false,
        records: {},
        loaded: false,
        optionsLoaded: false,
        options: [],
        fullSchedule: {},
        presences: {}
    };


    loadRecords = () => {
        // axios.get(API_URL + "subjects/" + this.props.subject.id + "/schedule/full", axiosService.getAuthConfig())
        //     .then(response => {
        //         this.setState({fullSchedule: response.data})
        //     })
        //     .catch((reason) => {
        //         axiosService.handleError(reason);
        //     });

        axios.get(API_URL + "subjects/" + this.props.subject.id + "/grades/full", axiosService.getAuthConfig())
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

    render() {

        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                Oceny
                            </h2>
                        </div>
                        <div className="col-4 text-right">
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">
                                Dodaj sekcje
                            </button>
                            <FullGradesAddModal
                                isOpen={this.state.isModalOpen}
                                toggleModal={this.toggleModal}
                                loadRecords={this.loadRecords}
                                subject={this.props.subject}
                            />

                            <button onClick={this.handleSave} className="btn btn-sm btn-primary">
                                Zapisz
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.fullSchedule.schedules ?
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush table-bordered text-center">
                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader text={"Student"}/>
                                {
                                    this.state.fullSchedule.schedules.map((schedule) => {
                                        return <FullSubjectScheduleTableHeader
                                            key={schedule.id}
                                            schedule={schedule}
                                            options={this.state.options}
                                            subject={this.props.subject}
                                        />
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody className="tbody-dark">
                            {
                                this.state.fullSchedule.rows.map((row, key) => {
                                    return <FullSubjectScheduleRow key={key} record={row} options={this.state.options}
                                                                   handlePresenceChange={this.handlePresenceChange}/>
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
            </div>
        )
    }
}

export default FullGradesScheduleView;


