import {API_URL} from "../constants/Api";
import axios from 'axios'
import axiosService from "../services/axios/AxiosService";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import BaseUsersController from "./BaseUsersController";
import UsersTableConstants from "../services/users/UsersTableConstants";


export class Users extends BaseUsersController {

    config = {
        tableName: UsersTableConstants.USERS
    };

    loadUsers = (usersListParams) => {

        usersListParams = usersListParams ? usersListParams : this.state.usersListParams;

        var config = axiosService.getAuthConfig();
        config.params = usersListParams;
        config.params.role = "ROLE_USER";

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

export default Users;


