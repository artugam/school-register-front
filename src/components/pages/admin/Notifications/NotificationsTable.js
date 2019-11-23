import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import Notification from "./Notification";
import {NotificationModal} from "./NotificationModal";

export class NotificationsTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: [],
        pageOfItems: [],
        records: {},
        loaded: false,
        listParams: {
            page: 1,
            records: 10,
            sortField: "",
            sortDirection: "DESC",
            search: ""
        },
        courses: []
    };

    updateListQueryParams = (listParams) => {
        this.setState(listParams);
    };

    refreshRecordsList = (records) => {
        this.setState({records})
    };

    constructor() {
        super();
        this.onChangePage = this.onChangePage.bind(this);
    }

    loadRecords = (listParams) => {
        listParams = listParams ? listParams : this.state.listParams;

        var config = axiosService.getAuthConfig();
        config.params = listParams;
        return axios.get(API_URL + "auth/notifications", config)
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


    componentDidMount() {
        this.loadRecords();
        this.loadCourses();
    }

    loadCourses() {
        axios.get(API_URL + "courses/all/records", axiosService.getAuthConfig())
            .then(response => {
                this.setState({courses: response.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }


    onChangePage(pager) {
        var config = this.state.listParams;
        config.page = pager.currentPage;
        config.records = pager.pageSize;

        // this.props.updateListQueryParams(config);
        this.loadRecords();
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleOnSearch = (target) => {
        if (target.charCode == 13) {
            var config = this.state.listParams;
            config.search = target.target.value;
            config.page = 1;

            this.updateListQueryParams(config);
            this.loadRecords();
        }
    };

    handleSort = (field, direction) => {
        var config = this.state.listParams;
        config.sortField = field;
        config.sortDirection = direction;
        config.page = 1;

        // this.props.updateListQueryParams(config);
        this.loadRecords();
    };


    render() {

        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                Powiadomienia
                            </h2>
                        </div>
                        <div className="col text-right">
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">
                                Dodaj Powiadomienie
                            </button>
                            {
                                this.state.courses.length > 0 ?
                                    <NotificationModal
                                        isOpen={this.state.isModalOpen}
                                        toggleModal={this.toggleModal}
                                        loadRecords={this.loadRecords}
                                        courses={this.state.courses}
                                    />
                                    : ''
                            }
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
                {this.state.records.content ?
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush table-bordered text-center">
                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader field={"description"} text={"Opis"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"c.name"} text={"Kierunek"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"g.name"} text={"Grupa"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"s.name"} text={"Przedmiot"} handleSort={this.handleSort}/>
                                {/*<SortTableHeader field={"email"} text={"Email"} handleSort={this.handleSort}/>*/}
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            {this.state.records.content.length > 0 ?
                                <tbody className="tbody-dark">
                                {this.state.records.content.map((record) => {
                                        return (<Notification
                                            record={record}
                                            key={record.id}
                                            loadRecords={this.loadRecords}
                                            courses={this.state.courses}
                                        />);
                                    }
                                )}
                                </tbody>
                                : ''
                            }
                        </table>
                        {this.state.records.content.length > 0 ? '' :
                            <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>
                        }
                        {this.state.records.content ?
                            <Pagination items={this.state.records.content} onChangePage={this.onChangePage}
                                        initialPage={this.state.records.page} pageSize={this.state.records.size}
                                        totalPages={this.state.records.totalPages}
                                        totalElements={this.state.records.totalElements}
                                        isLast={this.state.records.last}
                            />
                            : ''
                        }
                    </div>
                    : ''

                }
            </div>

        )
    }
}

export default NotificationsTable;


