import React from "react";
import globalConstants from "../constants/Global";
import { withRouter } from "react-router-dom";

export class Brand extends React.Component {

    logout = () => {
        localStorage.removeItem(globalConstants.authData);
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div className="container-fluid">
                        {/* Brand */}
                        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                           href="/dashboard">Dashboard</a>
                        {/* Form */}
                        {/*<form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">*/}
                        {/*    <div className="form-group mb-0">*/}
                        {/*        <div className="input-group input-group-alternative">*/}
                        {/*            <div className="input-group-prepend">*/}
                        {/*                <span className="input-group-text"><i className="fas fa-search"/></span>*/}
                        {/*            </div>*/}
                        {/*            <input className="form-control" placeholder="Search" type="text"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                        {/* User */}
                        <ul className="navbar-nav align-items-center d-none d-md-flex">
                            <li className="nav-item dropdown">
                                <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false">
                                    <div className="media align-items-center">
                                  <span className="avatar avatar-sm rounded-circle">
                                    <img alt="Image placeholder" src={require('../assets/img/profile.png')}/>
                                  </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span
                                                className="mb-0 text-sm  font-weight-bold">{ this.props.user.firstName + " " +  this.props.user.lastName}</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                    <div className=" dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <a href="./examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-single-02"/>
                                        <span>My profile</span>
                                    </a>
                                    <a href="./examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-settings-gear-65"/>
                                        <span>Settings</span>
                                    </a>
                                    <a href="./examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-calendar-grid-58"/>
                                        <span>Activity</span>
                                    </a>
                                    <a href="./examples/profile.html" className="dropdown-item">
                                        <i className="ni ni-support-16"/>
                                        <span>Support</span>
                                    </a>
                                    <div className="dropdown-divider"/>
                                    <a href="" className="dropdown-item" onClick={this.logout}>
                                        <i className="ni ni-user-run"/>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                    {/*<div className="container-fluid">*/}
                        {/*<div className="header-body">*/}
                            {/* Card stats */}
                            {/*<div className="row">*/}
                            {/*    <div className="col-xl-3 col-lg-6">*/}
                            {/*        <div className="card card-stats mb-4 mb-xl-0">*/}
                            {/*            <div className="card-body">*/}
                            {/*                <div className="row">*/}
                            {/*                    <div className="col">*/}
                            {/*                        <h5 className="card-title text-uppercase text-muted mb-0">Traffic</h5>*/}
                            {/*                        <span className="h2 font-weight-bold mb-0">350,897</span>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="col-auto">*/}
                            {/*                        <div*/}
                            {/*                            className="icon icon-shape bg-danger text-white rounded-circle shadow">*/}
                            {/*                            <i className="fas fa-chart-bar"/>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <p className="mt-3 mb-0 text-muted text-sm">*/}
                            {/*                    <span className="text-success mr-2"><i className="fa fa-arrow-up"/> 3.48%</span>*/}
                            {/*                    <span className="text-nowrap">Since last month</span>*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-xl-3 col-lg-6">*/}
                            {/*        <div className="card card-stats mb-4 mb-xl-0">*/}
                            {/*            <div className="card-body">*/}
                            {/*                <div className="row">*/}
                            {/*                    <div className="col">*/}
                            {/*                        <h5 className="card-title text-uppercase text-muted mb-0">New*/}
                            {/*                            users</h5>*/}
                            {/*                        <span className="h2 font-weight-bold mb-0">2,356</span>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="col-auto">*/}
                            {/*                        <div*/}
                            {/*                            className="icon icon-shape bg-warning text-white rounded-circle shadow">*/}
                            {/*                            <i className="fas fa-chart-pie"/>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <p className="mt-3 mb-0 text-muted text-sm">*/}
                            {/*                    <span className="text-danger mr-2"><i className="fas fa-arrow-down"/> 3.48%</span>*/}
                            {/*                    <span className="text-nowrap">Since last week</span>*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-xl-3 col-lg-6">*/}
                            {/*        <div className="card card-stats mb-4 mb-xl-0">*/}
                            {/*            <div className="card-body">*/}
                            {/*                <div className="row">*/}
                            {/*                    <div className="col">*/}
                            {/*                        <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>*/}
                            {/*                        <span className="h2 font-weight-bold mb-0">924</span>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="col-auto">*/}
                            {/*                        <div*/}
                            {/*                            className="icon icon-shape bg-yellow text-white rounded-circle shadow">*/}
                            {/*                            <i className="fas fa-users"/>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <p className="mt-3 mb-0 text-muted text-sm">*/}
                            {/*                    <span className="text-warning mr-2"><i className="fas fa-arrow-down"/> 1.10%</span>*/}
                            {/*                    <span className="text-nowrap">Since yesterday</span>*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-xl-3 col-lg-6">*/}
                            {/*        <div className="card card-stats mb-4 mb-xl-0">*/}
                            {/*            <div className="card-body">*/}
                            {/*                <div className="row">*/}
                            {/*                    <div className="col">*/}
                            {/*                        <h5 className="card-title text-uppercase text-muted mb-0">Performance</h5>*/}
                            {/*                        <span className="h2 font-weight-bold mb-0">49,65%</span>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="col-auto">*/}
                            {/*                        <div*/}
                            {/*                            className="icon icon-shape bg-info text-white rounded-circle shadow">*/}
                            {/*                            <i className="fas fa-percent"/>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <p className="mt-3 mb-0 text-muted text-sm">*/}
                            {/*                    <span className="text-success mr-2"><i className="fas fa-arrow-up"/> 12%</span>*/}
                            {/*                    <span className="text-nowrap">Since last month</span>*/}
                            {/*                </p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}


export default withRouter(Brand);;