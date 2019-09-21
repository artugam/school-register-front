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


export class Users extends BaseSiteController {

    state = {
        user: '',
        users: []
    };

    user = this.props.user;



    componentDidMount() {
        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        axios.get(API_URL + "users", axiosService.getAuthConfig())
            .then(response => {
                this.setState({users: response.data});
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
                                <UsersTable users={this.state.users}/>
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


