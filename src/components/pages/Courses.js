import React from 'react';
import {API_URL} from "../constants/Api";
import axios from 'axios'
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import axiosService from "../services/axios/AxiosService";
import BaseSiteController from "./BaseSiteController";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import CoursesTable from "./admin/Courses/CoursesTable";

export class Courses extends BaseSiteController {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        records: [],
        loaded: false,
        listParams: {
            page: 1,
            records: 10,
            sortField: "",
            sortDirection: "DESC",
            search: ""
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.loadRecords();
    }

    updateListQueryParams = (listParams) => {
        this.setState(listParams);
    };

    refreshRecordsList = (records) => {
        this.setState({records})
    };

    loadRecords = (listParams) => {

        listParams = listParams ? listParams : this.state.listParams;

        var config = axiosService.getAuthConfig();
        config.params = listParams;

        return axios.get(API_URL + "courses", config)
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
                                {this.state.loaded === true && this.state.user ?
                                    <CoursesTable
                                        records={this.state.records}
                                        loadRecords={this.loadRecords}
                                        listParams={this.state.listParams}
                                        updateListQueryParams={this.updateListQueryParams}
                                        roles={this.getRoles(this.state.user)}
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

export default Courses;


