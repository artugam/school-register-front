import React from 'react';


function Navigation(data){

    return (

        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a className="navbar-brand pt-0" href="/dashboard">
                    <img src={require('../assets/img/logo.jpg')} className="navbar-brand-img" alt="..."></img>
                </a>

                <ul className="nav align-items-center d-md-none">
                    <li className="nav-item dropdown">
                        <a className="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i className="ni ni-bell-55"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right"
                             aria-labelledby="navbar-default_dropdown_1">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="./assets/img/theme/team-1-800x800.jpg"></img>
                      </span>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                            <div className=" dropdown-header noti-title">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </div>
                            <a href="./examples/profile.html" className="dropdown-item">
                                <i className="ni ni-single-02"></i>
                                <span>My profile</span>
                            </a>
                            <a href="./examples/profile.html" className="dropdown-item">
                                <i className="ni ni-settings-gear-65"></i>
                                <span>Settings</span>
                            </a>
                            <a href="./examples/profile.html" className="dropdown-item">
                                <i className="ni ni-calendar-grid-58"></i>
                                <span>Activity</span>
                            </a>
                            <a href="./examples/profile.html" className="dropdown-item">
                                <i className="ni ni-support-16"></i>
                                <span>Support</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#!" className="dropdown-item">
                                <i className="ni ni-user-run"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>

                <div className="collapse navbar-collapse" id="sidenav-collapse-main">

                    <div className="navbar-collapse-header d-md-none">
                        <div className="row">
                            <div className="col-6 collapse-brand">
                                <a href="./index.html">
                                    <img src="./assets/img/brand/blue.png"></img>
                                </a>
                            </div>
                            <div className="col-6 collapse-close">
                                <button type="button" className="navbar-toggler" data-toggle="collapse"
                                        data-target="#sidenav-collapse-main" aria-controls="sidenav-main"
                                        aria-expanded="false" aria-label="Toggle sidenav">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <form className="mt-4 mb-3 d-md-none">
                        <div className="input-group input-group-rounded input-group-merge">
                            <input type="search"
                                   className="form-control form-control-rounded form-control-prepended"
                                   placeholder="Search" aria-label="Search"></input>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="fa fa-search"></span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item active ">
                            <a className=" nav-link active " href="/dashboard"> <i
                                className="ni ni-tv-2 text-primary"></i> Panel głowny
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="./examples/icons.html">
                                <i className="ni ni-planet text-blue"></i> Icons
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="./examples/maps.html">
                                <i className="ni ni-pin-3 text-orange"></i> Maps
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/users">
                                <i className="ni ni-single-02 text-yellow"></i> Użytkownicy
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="./examples/tables.html">
                                <i className="ni ni-bullet-list-67 text-red"></i> Tables
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./examples/login.html">
                                <i className="ni ni-key-25 text-info"></i> Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./examples/register.html">
                                <i className="ni ni-circle-08 text-pink"></i> Register
                            </a>
                        </li>
                    </ul>
                    <hr className="my-3"></hr>

                    <h6 className="navbar-heading text-muted">Documentation</h6>
                    <ul className="navbar-nav mb-md-3">
                        <li className="nav-item">
                            <a className="nav-link"
                               href="https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html">
                                <i className="ni ni-spaceship"></i> Getting started
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="https://demos.creative-tim.com/argon-dashboard/docs/foundation/colors.html">
                                <i className="ni ni-palette"></i> Foundation
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                               href="https://demos.creative-tim.com/argon-dashboard/docs/components/alerts.html">
                                <i className="ni ni-ui-04"></i> Components
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}


export default Navigation;