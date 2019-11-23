import React from 'react';
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import SortTableHeader from "../../../modules/SortTableHeader";
import Notification from "../Notifications/Notification";
import Pagination from "../../../services/paginators/Pagination";
import PaginationDasboard from "../../../services/paginators/PaginationDasboard";
import Moment from "react-moment";

export class DashboardNotifications extends React.Component {

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        notifications: [],
        listParams: {
            page: 1,
            records: 5
        },
        loaded: false,
        records: {}
    };


    componentDidMount() {
        this.loadRecords();
    }

    onChangePage = (pager) => {
        var config = this.state.listParams;
        config.page = pager.currentPage;
        config.records = pager.pageSize;

        this.loadRecords();
    }

    loadRecords = (listParams) => {
        listParams = listParams ? listParams : this.state.listParams;

        var config = axiosService.getAuthConfig();
        config.params = listParams;
        return axios.get(API_URL + "auth/me/notifications", config)
            .then(response => {
                this.setState({records: response.data})
                if (!this.state.loaded) {
                    this.setState({loaded: true})
                }
                return response.data;
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    render() {

        return (
            <div className="row">
                <div className="col-xl-12">
                    <div className="card shadow">
                        <div className="card-header bg-transparent">
                            <div className="row align-items-center">
                                <div className="col">
                                    {/*<h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>*/}
                                    <h2 className="mb-0">Powiadomienia</h2>
                                </div>
                            </div>
                        </div>
                        {this.state.records.content ?
                            <div className="table-responsive">
                                {this.state.records.content.length > 0 ?
                                    <div>
                                    {this.state.records.content.map((record) => {
                                            return <div className="card" key={record.id}>
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {record.course.name}
                                                        {record.group ? " | " + record.group.name : ''}
                                                        {record.subject ? " | " + record.subject.name : ''}
                                                        <span className="pull-right">
                                                            <Moment format="DD/MM/YYYY HH:mm">
                                                                {record.createdAt}
                                                            </Moment>
                                                        </span>
                                                    </h5>
                                                    <p className="card-text">
                                                        {record.description}
                                                    </p>
                                                </div>
                                            </div>;
                                        }
                                    )}
                                    </div>
                                    : ''
                                }
                                {this.state.records.content.length > 0 ? '' :
                                    <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>
                                }
                                {this.state.records.content ?
                                    <PaginationDasboard items={this.state.records.content} onChangePage={this.onChangePage}
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

export default DashboardNotifications;


