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
import GroupSubjectsTable from "./admin/GroupSubjects/GroupSubjectsTable";

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

export class GroupSubjects extends BaseSiteController {

    state = {
        user: {
            firstName: '-',
            lastName: '-'
        },
        group: {},
        records: []
    };

    id = null;

    componentDidMount() {
        super.componentDidMount();
        this.id = this.props.match.params.groupId;
        this.load();
    };

    load = () => {
        axios.get(API_URL + "groups/" + this.id, axiosService.getAuthConfig())
            .then(response => {
                this.setState({group: response.data})
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
                                {this.state.group.id ?
                                    <div>
                                        {/*<CourseInfo*/}
                                        {/*    course={this.state.course}*/}
                                        {/*    records={this.state.records}*/}
                                        {/*/>*/}
                                        {/*<br></br>*/}
                                        <GroupSubjectsTable
                                            group={this.state.group}
                                            loadGroup={this.load}
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


export default GroupSubjects;


