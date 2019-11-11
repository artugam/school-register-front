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
import BaseUsersController from "./BaseUsersController";


export class Teachers extends BaseUsersController {

    config = {
        tableName: "Wykładowcy"
    };



    loadUsers = (usersListParams) => {

        usersListParams = usersListParams ? usersListParams : this.state.usersListParams;

        var config = axiosService.getAuthConfig();
        config.params = usersListParams;
        config.params.role = "ROLE_TEACHER";
        return axios.get(API_URL + "users", config)
            .then(response => {
                this.refreshUsersList(response.data);
                if(!this.state.loaded) {
                    this.setState({loaded: true})
                }
                return response.data;
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });

    }
}

export default Teachers;


