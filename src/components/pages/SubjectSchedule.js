import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import GroupStudentsTable from "./admin/Group/GroupStudentsTable";
import CourseInfo from "./admin/CourseDetails/CourseInfo";
import GroupInfo from "./admin/Group/GroupInfo";
import SubjectScheduleTable from "./admin/Subject/SubjectScheduleTable";
import SubjectScheduleInfo from "./admin/Subject/SubjectScheduleInfo";


export class SubjectSchedule extends BaseSiteController {

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
                                {this.state.subject.id ?
                                    <div>
                                        <SubjectScheduleInfo
                                            subject={this.state.subject}
                                        />
                                        <br></br>
                                        <SubjectScheduleTable
                                            subject={this.state.subject}
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


export default SubjectSchedule;


