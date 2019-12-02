import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import axios from "axios";
import {API_URL} from "../constants/Api";
import axiosService from "../services/axios/AxiosService";
import CourseStudentsTable from "./admin/CourseDetails/CourseStudentsTable";
import CourseInfo from "./admin/CourseDetails/CourseInfo";

// import React from 'react';
// import {API_URL} from "../constants/Api";
// import axios from 'axios'
// import Navigation from "../layout/Navigation";
// import Brand from "../layout/Brand";
// import Footer from "../layout/Footer";
// import axiosService from "../services/axios/AxiosService";
// import BaseSiteController from "./BaseSiteController";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import CourseStudentsTable from "./admin/Courses/CoursesTable";

export class CourseDetails extends BaseSiteController {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        course: {},
        records: []
    };

    courseId = null;

    componentDidMount() {
        super.componentDidMount();
        this.courseId = this.props.match.params.courseId;

        this.loadCourse();

    };

    loadCourse = () => {
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
                                {this.state.course.id && this.state.user ?
                                    <div>
                                        <CourseInfo
                                            course={this.state.course}
                                            records={this.state.records}
                                        />
                                        <br></br>
                                        <CourseStudentsTable
                                            course={this.state.course}
                                            loadCourse={this.loadCourse}
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


export default CourseDetails;


