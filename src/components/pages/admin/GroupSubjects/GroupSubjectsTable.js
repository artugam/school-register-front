import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import GroupSubjectsAddModal from "./GroupSubjectsAddModal";
import GroupSubject from "./GroupSubject";

export class GroupSubjectsTable extends React.Component {

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
        optionsLoaded: false,
        options: []
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
        return axios.get(API_URL + "groups/" + this.props.group.id + "/subjects", config)
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
        this.loadOptions();
    }

    loadOptions = () => {
        var config = axiosService.getAuthConfig();

        return axios.get(API_URL + "subjects/configuration/options", config)
            .then(response => {
                if (!this.state.optionsLoaded) {
                    this.setState({optionsLoaded: true})
                }
                var out = {
                    teachers: [],
                    types: response.data.types
                };
                response.data.teachers.map(item => {
                    out.teachers.push({
                        label: item.lastName + " " + item.firstName,
                        value: item.id
                    })
                });
                this.setState({options : out});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };


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

        this.loadRecords();
    };

    addCallBack = (selected) => {

        var options = this.state.options.filter(option => {
            return selected.indexOf(option.value) === -1;
        });
        this.setState({options: options});
    };

    render() {

        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                <a href={"/courses/" + this.props.group.course.id + "/groups/"}  >
                                    <i className="fa fa-arrow-left"></i>
                                </a>
                                &nbsp; Grupa - <b>{this.props.group.name}</b>
                            </h2>
                        </div>
                        <div className="col text-right">
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">
                                Dodaj Przedmiot
                            </button>
                            {
                                this.state.optionsLoaded === true ?
                                    <GroupSubjectsAddModal
                                        isOpen={this.state.isModalOpen}
                                        toggleModal={this.toggleModal}
                                        loadRecords={this.loadRecords}
                                        group={this.props.group}
                                        options={this.state.options}
                                        callBack={this.addCallBack}
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
                                    <SortTableHeader field={"name"} text={"Nazwa"} handleSort={this.handleSort}/>
                                    <SortTableHeader field={"hours"} text={"Ilość godzin"} handleSort={this.handleSort}/>
                                    <SortTableHeader field={"type"} text={"Rodzaj"} handleSort={this.handleSort}/>
                                    <SortTableHeader text={"Prowadzący"} handleSort={this.handleSort}/>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                {this.state.records.content.length > 0 ?
                                    <tbody className="tbody-dark">
                                    {this.state.records.content.map((record) => {
                                            return (<GroupSubject
                                                record={record}
                                                key={record.id}
                                                loadRecords={this.loadRecords}
                                                group={this.props.group}
                                                options={this.state.options}
                                                callBack={this.addCallBack}
                                            />);
                                        }
                                    )}
                                    </tbody>
                                    : <tbody></tbody>
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

export default GroupSubjectsTable;


