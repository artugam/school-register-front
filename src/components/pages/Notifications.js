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
import NotificationsTable from "./admin/Notifications/NotificationsTable";


export class Notifications extends BaseSiteController {


    render() {

        return (
            <div>
                <Navigation user={this.state.user}/>
                <div className="main-content">
                    <Brand user={this.state.user}/>

                    <div className="container-fluid mt--7">
                        <div className="row mt-0">
                            <div className="col-xl-12 mb-5 mb-xl-0">
                                {/*{this.state.group.id ?*/}
                                    <div>
                                        {/*<GroupInfo*/}
                                        {/*    group={this.state.group}*/}
                                        {/*    records={this.state.records}*/}
                                        {/*/>*/}
                                        {/*<br></br>*/}
                                        <NotificationsTable />
                                    </div>
                                {/*: ''}*/}
                            </div>
                        </div>
                        <Footer/>
                    </div>

                </div>

            </div>
        )
    }

}


export default Notifications;


