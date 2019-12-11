import React from 'react';
import '../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css'
import '../assets/js/plugins/nucleo/css/nucleo.css'
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/argon-dashboard.css'
import '../assets/css/custom.css'
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import globalConstants from "../constants/Global";

export class BaseSiteController extends React.Component {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        loaded: false,

    };

    componentDidMount() {
        this.loadMe();
        this.redirectDashboard();
    }
    loadMe = () => {
        axios.get(API_URL + "auth/me", axiosService.getAuthConfig())
            .then(res => {
                this.setState({user: res.data});
                this.setState({loaded: true})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    getRoles = (user) => {
        var allRoles = [];
        if(!user || !user.roles) {
            return allRoles;
        }

        user.roles.map((role) => {
            allRoles.push(role.name);
        });
        return allRoles;
    };

    redirectDashboard = () => {
        if(!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }
    }

}

export default BaseSiteController;


