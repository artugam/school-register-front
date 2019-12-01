import React from 'react';
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import SortTableHeader from "../../../modules/SortTableHeader";
import Notification from "../Notifications/Notification";
import Pagination from "../../../services/paginators/Pagination";
import PaginationDasboard from "../../../services/paginators/PaginationDasboard";
import Moment from "react-moment";

export class DashboardPlanSubjects extends React.Component {

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        loaded: false,
        records: {},
        dateRange: {
            start: false,
            end: false
        }

    };


    componentDidMount() {
        this.dateRange();
        this.loadRecords();
    }


    loadRecords = () => {

        var config = axiosService.getAuthConfig();
        config.params = {
            start: this.state.dateRange.start ? this.state.dateRange.start : this.getMonday(),
            end: this.state.dateRange.end ? this.state.dateRange.end : this.getSunday(this.getMonday())
        };

        config.params.start = config.params.start.toString();
        config.params.end = config.params.end.toString();

        return axios.get(API_URL + "auth/me/subjects", config)
            .then(response => {
                this.setState({records: response.data})
                if (!this.state.loaded) {
                    this.setState({loaded: true})
                }
                this.setState({records: response.data});
                return response.data;
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    dateRange() {

        var start = this.getMonday();
        if (false !== this.state.dateRange.start) {
            start = this.state.dateRange.start;
        }
        var end = this.getSunday(start);

        var dateRange = {
            start: start,
            end: end
        }

        this.setState({dateRange});

    };

    getSunday(start) {
        var end = this.getDateAppendDays(start, 6);

        end.setSeconds(59);
        end.setMinutes(59);
        end.setHours(23);

        return end;
    }

    getDateAppendDays(date, days) {
        var sunday = new Date(date);
        sunday.setDate(date.getDate() + days);
        return sunday;
    }

    getMonday() {
        var d = new Date();
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        var monday = new Date(d.setDate(diff));
        monday.setHours(0);
        monday.setMinutes(0);
        monday.setSeconds(0);
        return monday;
    }

    handleChangePeriodPrevious = () => {
        this.handleChangePeriod(-7);
    };

    handleChangePeriodNext = () => {
        this.handleChangePeriod(7);
    };

    handleChangePeriod = (days) => {

        var dateRange = this.state.dateRange;
        dateRange.start = this.getDateAppendDays(this.state.dateRange.start, days);
        dateRange.end = this.getDateAppendDays(this.state.dateRange.end, days);

        this.setState({dateRange: dateRange}, function () {
            this.loadRecords();
        });

    };

    render() {

        return (
            <div className="row mt-5">
                <div className="col-xl-12 mb-5 mb-xl-0">
                    <div className="card shadow">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <h3 className="mb-0">Zajęcia</h3>
                                </div>
                                <div className="col-8 text-right">
                                    <button onClick={this.handleChangePeriodPrevious}
                                            className="btn btn-sm btn-primary">
                                        Poprzedni Tydzień
                                    </button>
                                    <b>
                                        <Moment format="DD-MM-YYYY">
                                            {new Date(this.state.dateRange.start)}
                                        </Moment>
                                    </b>
                                    &nbsp;do&nbsp;
                                    <b>
                                        <Moment format="DD-MM-YYYY">
                                            {new Date(this.state.dateRange.end)}
                                        </Moment>
                                    </b>
                                    &nbsp;
                                    <button onClick={this.handleChangePeriodNext} className="btn btn-sm btn-primary">
                                        Następny Tydzień
                                    </button>
                                </div>
                            </div>
                        </div>
                        {this.state.records ?
                            <div className="table-responsive">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Przedmiot</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">Koniec</th>
                                        <th scope="col">Grupa</th>
                                        <th scope="col">Kierunek</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    {this.state.records.length > 0 ?
                                        <tbody className="tbody-dark">
                                        {this.state.records.map((record) => {
                                                return (
                                                    <tr key={record.id}>
                                                        <td>{record.subject.name}</td>
                                                        <td>
                                                            <Moment format="DD-MM-YYYY HH:mm">
                                                                {record.start}
                                                            </Moment>
                                                        </td>
                                                        <td>
                                                            <Moment format="DD-MM-YYYY HH:mm">
                                                                {record.end}
                                                            </Moment>
                                                        </td>
                                                        <td>{record.subject.group.name}</td>
                                                        <td>{record.subject.group.course.name}</td>
                                                        <td>
                                                            <a style={actionButtonStyle} href={"/subjects/" + record.subject.id + "/schedule"} title="Dziennik">
                                                                <i className="far fa-calendar-alt"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        </tbody>
                                        : <tbody></tbody>
                                    }
                                </table>
                                {this.state.records.length > 0 ? '' :
                                    <div className="p-3 text-center d-block">Brak zajęć</div>
                                }
                            </div>
                            : ''

                        }
                    </div>
                </div>
            </div>
        )
    }

}

const actionButtonStyle = {
    cursor: "pointer",
    // display: "block",
    padding: "0px 5px"
}

export default DashboardPlanSubjects;


