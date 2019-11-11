import React from 'react';
import User from "./User";
import UserModal from "./UserModal";
import globalConstants from "../../../constants/Global";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";


export class UsersTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: [],
        pageOfItems: []

    };

    constructor() {
        super();
        this.onChangePage = this.onChangePage.bind(this);
    }


    onChangePage(pager) {
        var config = this.props.userListParams;
        config.page = pager.currentPage;
        config.records = pager.pageSize;

        this.props.updateUsersQueryParams(config);
        this.props.loadUsers();
    }


    componentDidMount() {

        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        axios.get(API_URL + "roles", axiosService.getAuthConfig())
            .then(response => {
                this.setState({allowedRoles: response.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleOnSearch = (target) => {
        if(target.charCode == 13){
            var config = this.props.userListParams;
            config.search = target.target.value;
            config.page = 1;

            this.props.updateUsersQueryParams(config);
            this.props.loadUsers();
        }
    };

    handleSort = (field, direction) => {
        var config = this.props.userListParams;
        config.sortField = field;
        config.sortDirection = direction;
        config.page = 1;

        this.props.updateUsersQueryParams(config);
        this.props.loadUsers();
    };

    render() {
        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="mb-0 p-2">{this.props.config.tableName ? this.props.config.tableName : "Użytkownicy"}</h2>
                        </div>
                        <div className="col text-right">
                            {/*<a href="#!" className="btn btn-sm btn-primary">See all</a>*/}
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">Dodaj Nowego
                                Użytkownika
                            </button>
                            <UserModal isOpen={this.state.isModalOpen} action={"add"} toggleModal={this.toggleModal}
                                       allowedRoles={this.state.allowedRoles}
                                       loadUsers={this.props.loadUsers}
                                       userListParams={this.props.userListParams}
                            />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-3 text-right">
                            <input type="text"
                                   className={"form-control"}
                                   id="search" onKeyPress={this.handleOnSearch}
                                   onChange={this.handleOnChange}
                                   placeholder="Szukaj"></input>
                        </div>
                    </div>
                </div>
                {this.props.users ?
                    <div className="table-responsive-md">
                        {/* Projects table */}

                        <table className="table align-items-center table-flush table-bordered text-center">

                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader field={"firstName"} text={"Imie"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"lastName"} text={"Nazwisko"} handleSort={this.handleSort} />
                                <SortTableHeader field={"email"} text={"Email"} handleSort={this.handleSort} />
                                <SortTableHeader text={"Rola"}/>
                                <SortTableHeader field={"enabled"} text={"Status"} handleSort={this.handleSort} />
                                <th scope="col"></th>
                            </tr>
                            </thead>

                            {this.props.users.content.length > 0 ?
                                <tbody className="tbody-dark">
                                {this.props.users.content.map((user) => {
                                        return (<User
                                            user={user}
                                            key={user.id}
                                            allowedRoles={this.state.allowedRoles}
                                            loadUsers={this.props.loadUsers}
                                        />);
                                    }
                                )}
                                </tbody>
                                : ''
                            }
                        </table>
                        {this.props.users.content.length > 0 ? '' : <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>}

                        <Pagination items={this.props.users.content} onChangePage={this.onChangePage}
                                    initialPage={this.props.users.page} pageSize={this.props.users.size}
                                    totalPages={this.props.users.totalPages} totalElements={this.props.users.totalElements}
                                    isLast={this.props.users.last}
                        />

                    </div>
                            : ''

                }
            </div>

        )
    }
}

export default UsersTable;


