import React from 'react';
import {API_URL} from "../constants/Api";
import axios from 'axios'
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import axiosService from "../services/axios/AxiosService";
import globalConstants from "../constants/Global";
import BaseSiteController from "./BaseSiteController";
import UsersTable from "./admin/Users/UsersTable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SortTableHeader from "../modules/SortTableHeader";


export class BaseUsersController extends BaseSiteController {

    state = {
        user: '',
        users: [],
        loaded: false,
        usersListParams: {
            page: 1,
            records: 10,
            sortField: "firstName",
            sortDirection: "DESC",
            search: ""
        }
    };

    componentDidMount() {
        super.componentDidMount();
        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        this.loadUsers();
    }

    updateUsersQueryParams = (usersListParams) => {
    // updateUsersQueryParams = (page, records, sortField, search) => {
    //     var usersListParams = {
    //         page: page ? page : this.state.usersListParams.page,
    //         records: records ? records : this.state.usersListParams.records,
    //         sortField: sortField ? sortField : this.state.usersListParams.sortField,
    //         search: search ? search : this.state.usersListParams.search
    //     };
        this.setState(usersListParams);
    };

    refreshUsersList = (users) => {
        this.setState({ users })
    }


    render() {
        // const greeting =
        return (
            <div>
                <Navigation user={this.state.user}/>

                <div className="main-content">
                    {/* Navbar */}
                    <Brand user={this.state.user}/>
                    {/* End Navbar */}
                    {/* Header */}

                    <div className="container-fluid mt--7">
                        <div className="row mt-0">
                            <div className="col-xl-12 mb-5 mb-xl-0">
                                {this.state.loaded === true ?
                                    <UsersTable
                                        users={this.state.users}
                                        loadUsers={this.loadUsers}
                                        userListParams={this.state.usersListParams}
                                        updateUsersQueryParams={this.updateUsersQueryParams}
                                        config={this.config}
                                    />
                                    : ''
                                }
                            </div>
                        </div>
                        <Footer/>
                    </div>

                </div>

            </div>
        )
    }
}

export default BaseUsersController;


