import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";
import CourseModal from "./CourseModal";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import Course from "./Course";


export class CoursesTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: [],
        pageOfItems: [],
        configOptions: {
            degrees: [],
            forms: []
        }
    };
    constructor() {
        super();
        this.onChangePage = this.onChangePage.bind(this);
    }


    componentDidMount() {
        axios.get(API_URL + "courses/configuration/options", axiosService.getAuthConfig())
            .then(response => {
                this.setState({configOptions: response.data})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }


    onChangePage(pager) {
        var config = this.props.listParams;
        config.page = pager.currentPage;
        config.records = pager.pageSize;

        // this.props.updateListQueryParams(config);
        this.props.loadRecords();
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleOnSearch = (target) => {
        if (target.charCode == 13) {
            var config = this.props.listParams;
            config.search = target.target.value;
            config.page = 1;

            this.props.updateListQueryParams(config);
            this.props.loadRecords();
        }
    };

    handleSort = (field, direction) => {
        var config = this.props.listParams;
        config.sortField = field;
        config.sortDirection = direction;
        config.page = 1;

        // this.props.updateListQueryParams(config);
        this.props.loadRecords();
    };

    render() {
        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="mb-0 p-2">Kierunki</h2>
                        </div>
                        <div className="col text-right">
                            {/*<a href="#!" className="btn btn-sm btn-primary">See all</a>*/}
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">
                                Dodaj Nowy Kierunek
                            </button>
                            {/*{this.state.configOptions  ?*/}
                            {/*    <CourseModal isOpen={this.state.isModalOpen} action={"add"} toggleModal={this.toggleModal}*/}
                            {/*                 loadRecords={this.props.loadRecords}*/}
                            {/*                 configOptions={this.state.configOptions}*/}
                            {/*                 listParams={this.props.listParams}*/}
                            {/*    />*/}
                            {/*    : ''*/}
                            {/*}*/}
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-3 text-right">
                            <input type="text"
                                   className={"form-control"}
                                   id="search" onKeyPress={this.handleOnSearch}
                                   onChange={this.handleOnChange}
                                   placeholder="Szukaj">
                            </input>
                        </div>
                    </div>
                </div>
                {this.props.records.content ?
                    <div className="table-responsive-md">
                        <table className="table align-items-center table-flush table-bordered text-center">
                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader field={"name"} text={"Nazwa"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"degree"} text={"Stopień"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"form"} text={"Rodzaj"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"startDate"} text={"rocznik"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"semesters"} text={"Ilość semestrów"} handleSort={this.handleSort}/>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            {this.props.records.content.length > 0 ?
                                <tbody className="tbody-dark">
                                {this.props.records.content.map((record) => {
                                        return (<Course
                                            record={record}
                                            key={record.id}
                                            configOptions={this.state.configOptions}
                                            loadRecords={this.props.loadRecords}
                                        />);
                                    }
                                )}
                                </tbody>
                                : ''
                            }
                        </table>
                        {this.props.records.content.length > 0 ? '' :
                            <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>
                        }

                        <Pagination items={this.props.records.content} onChangePage={this.onChangePage}
                                    initialPage={this.props.records.page} pageSize={this.props.records.size}
                                    totalPages={this.props.records.totalPages}
                                    totalElements={this.props.records.totalElements}
                                    isLast={this.props.records.last}
                        />

                    </div>
                    : ''

                }
            </div>

        )
    }
}

export default CoursesTable;


