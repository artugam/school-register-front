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
    };

    componentDidMount() {

        this.loadMe();

        this.redirectDashboard();
    }
    loadMe = () => {
        axios.get(API_URL + "auth/me", axiosService.getAuthConfig())
            .then(res => {
                this.setState({user: res.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
                // localStorage.removeItem(globalConstants.authData);
                // this.redirectDashboard();
            });
    }

    redirectDashboard = () => {
        if(!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }
    }

}

export default BaseSiteController;


