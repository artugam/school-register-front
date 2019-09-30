import React from 'react';
import {API_URL} from "../constants/Api";
import axios from 'axios'
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import axiosService from "../services/axios/AxiosService";
import globalConstants from "../constants/Global";
import User from "./admin/Users/User";
import BaseSiteController from "./BaseSiteController";
import UsersTable from "./admin/Users/UsersTable";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


export class Users extends BaseSiteController {

    state = {
        user: '',
        users: [],
        loaded: false
    };

    user = this.props.user;


    componentDidMount() {
        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        this.loadUsers();
    }

    refreshUsersList = (users) => this.setState({ users })

    loadUsers = () => {

        this.forceUpdate();
        axios.get(API_URL + "users", axiosService.getAuthConfig())
            .then(response => {
                this.refreshUsersList(response.data);
                this.setState({loaded: true})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });

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

export default Users;


