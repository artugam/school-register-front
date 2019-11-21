import React from 'react';
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import FullSubjectScheduleTableHeader from "./FullSubjectScheduleTableHeader";
import FullSubjectScheduleRow from "./FullSubjectScheduleRow";
import toast from "../../../services/toast/ToastService";
import FullGradesAddModal from "./FullGradesAddModal";
import FullGradesScheduleRow from "./FullGradesScheduleRow";
import FullGradeTableHeader from "./FullGradeTableHeader";


export class FullGradesScheduleView extends React.Component {

    state = {
        isModalOpen: false,
        records: {},
        loaded: false,
        optionsLoaded: false,
        options: [],
        fullSchedule: {},
        grades: {}
    };


    loadRecords = () => {

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

        return axios.get(API_URL + "grades/configuration/options", config)
            .then(response => {
                if (!this.state.optionsLoaded) {
                    this.setState({optionsLoaded: true})
                }
                var out = {
                    types: response.data.options
                };
                out.types[0] = "";
                this.setState({options: out});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    handlePresenceChange = (id, value) => {
        var grades = this.state.grades;
        grades[id] = value;

        this.setState(grades);
    };


    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleSave = () => {
        var config = axiosService.getAuthConfig();
        var params = [];

        var grades = this.state.grades;

        Object.keys(this.state.grades).forEach(function (key, index) {
            var grade = grades[key] ? grades[key] : 0;
            params.push({
                id: parseInt(key),
                grade: parseFloat(grade)
            })
        });

        axios.post(API_URL + "grades/update/all", params, config)
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
                {this.state.fullSchedule.sections ?
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush table-bordered text-center">
                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader text={"Student"}/>
                                {
                                    this.state.fullSchedule.sections.map((description) => {
                                        return <FullGradeTableHeader
                                            key={description}
                                            text={description}
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
                                    return <FullGradesScheduleRow
                                        key={key}
                                        record={row}
                                        options={this.state.options}
                                        handlePresenceChange={this.handlePresenceChange}/>
                                })
                            }
                            </tbody>
                        </table>
                        {this.state.fullSchedule.sections.length > 0 ? '' :
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


