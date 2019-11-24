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
                           href="/dashboard">Panel Główny</a>
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
                                        <h6 className="text-overflow m-0">Witaj!</h6>
                                    </div>
                                    <a href="/profile" className="dropdown-item">
                                        <i className="ni ni-single-02"/>
                                        <span>Mój profil</span>
                                    </a>
                                    <div className="dropdown-divider"/>
                                    <a href="" className="dropdown-item" onClick={this.logout}>
                                        <i className="ni ni-user-run"/>
                                        <span>Wyloguj</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                </div>
            </div>
        )
    }
}


export default withRouter(Brand);;