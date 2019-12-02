import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import FullSubjectScheduleView from "./admin/ClassRegister/FullSubjectScheduleView";
import FullGradesScheduleView from "./admin/ClassRegister/FullGradesScheduleView";


export class FullSubjectSchedule extends BaseSiteController {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        subject: {},
        records: []
    };

    id = null;

    componentDidMount() {
        super.componentDidMount();
        this.id = this.props.match.params.subjectId;

        axios.get(API_URL + "subjects/" + this.id, axiosService.getAuthConfig())
            .then(response => {
                this.setState({subject: response.data})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };


    render() {
        return (
            <div>
                <Navigation user={this.state.user}/>
                <div className="main-content">
                    <Brand user={this.state.user}/>

                    <div className="container-fluid mt--7">
                        <div className="row mt-0">
                            <div className="col-xl-12 mb-5 mb-xl-0">
                                {this.state.subject.id && this.state.user ?
                                    <div>
                                        <FullSubjectScheduleView
                                            subject={this.state.subject}
                                            user={this.state.user}
                                            roles={this.getRoles(this.state.user)}
                                        />
                                        <br></br>
                                        <br></br>
                                        <FullGradesScheduleView
                                            subject={this.state.subject}
                                            user={this.state.user}
                                            roles={this.getRoles(this.state.user)}
                                        />
                                    </div>
                                    : ''}
                            </div>
                        </div>
                        <Footer/>
                    </div>

                </div>

            </div>
        )
    }

}


export default FullSubjectSchedule;


