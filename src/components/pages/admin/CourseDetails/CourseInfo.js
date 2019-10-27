import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import CourseStudent from "./CourseStudent";
import Moment from "react-moment";
import CourseStudentAddModal from "./CourseStudentAddModal";

export class CourseInfo extends React.Component {

    state = {
        listParams: {
            page: 1,
            records: 10,
            sortField: "",
            sortDirection: "DESC",
            search: ""
        },
        records: []
    };

    componentDidMount() {
        this.loadRecords();
    }

    loadRecords = (listParams) => {
        listParams = listParams ? listParams : this.state.listParams;

        var config = axiosService.getAuthConfig();
        config.params = listParams;
        return axios.get(API_URL + "courses/" + this.props.course.id + "/students", config)
            .then(response => {
                this.setState({records: response.data});

                return response.data;
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
                        <div className="col">

                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                Kierunek:
                            </h2>

                            <h2 className="d-inline text-gray-dark font-weight-900">{this.props.course.name} - <Moment
                                format="MM-YYYY">{this.props.course.startDate}</Moment></h2>
                        </div>
                    </div>
                    <div className="col">
                        <hr></hr>
                        <div className="row tab-pane">
                            <div className="col-sm-6">
                                <h3>Starosta</h3>
                            </div>
                            <div className="col-sm-6">
                                <h3>{this.props.course.foreman.firstName} {this.props.course.foreman.lastName} ({this.props.course.foreman.email})</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Ilość studentów</h3>
                            </div>
                            <div className="col-sm-6">
                                <h3>{this.state.records.totalElements}</h3>
                            </div>
                        </div>
                    </div>


                </div>


            </div>


        )
    }
}

export default CourseInfo;


