import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import CourseStudentsTable from "./admin/CourseDetails/CourseStudentsTable";

export class CourseDetails extends BaseSiteController {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        course: {}
    };

    courseId = null;

    componentDidMount() {
        super.componentDidMount();
        this.courseId = this.props.match.params.courseId;

         axios.get(API_URL + "courses/" + this.courseId, axiosService.getAuthConfig())
            .then(response => {
                this.setState({course: response.data})
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }

    render() {

        return (
            <div>
                <Navigation user={this.state.user}/>
                <div className="main-content">
                    <Brand user={this.state.user}/>

                    <div className="container-fluid mt--7">
                        <div className="row mt-0">
                            <div className="col-xl-12 mb-5 mb-xl-0">
                                {this.state.course.id ?
                                    <CourseStudentsTable
                                        course={this.state.course}
                                    />
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


export default CourseDetails;


