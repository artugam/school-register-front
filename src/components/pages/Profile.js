import React from 'react';
import Navigation from "../layout/Navigation";
import Brand from "../layout/Brand";
import Footer from "../layout/Footer";
import BaseSiteController from "./BaseSiteController";
import DashboardNotifications from "./admin/Dashboard/DashboardNotifications";
import DashboardTodaysSubjects from "./admin/Dashboard/DashboardTodaysSubjects";
import DashboardPlanSubjects from "./admin/Dashboard/DashboardPlanSubjects";
import Moment from "react-moment";
import PaginationDasboard from "../services/paginators/PaginationDasboard";
import ProfileData from "./profile/ProfileData";
import ProfileSubjectsTable from "./profile/ProfileSubjectsTable";


export class Profile extends BaseSiteController {

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <div>
                <Navigation user={this.state.user}/>

                <div className="main-content">
                    {/* Navbar */}
                    <Brand user={this.state.user}/>

                    <div className="container-fluid mt--7">

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#profile" role="tab"
                                                   data-toggle="tab">Profil</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#buzz" role="tab"
                                                   data-toggle="tab">Przedmioty</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane fade active show" id="profile">
                                                {
                                                    this.state.loaded ?
                                                        <ProfileData
                                                            user={this.state.user}
                                                        />
                                                        : ''
                                                }
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="buzz">
                                                {
                                                    this.state.loaded ?
                                                        <ProfileSubjectsTable
                                                            user={this.state.user}
                                                        />
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile;


