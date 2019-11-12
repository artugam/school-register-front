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
                    <img src={require('../assets/img/logoUR.jpg')} className="navbar-brand-img" alt="..."></img>
                </a>

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
                            <a className="nav-link " href="/courses">
                                <i className="ni ni-planet text-blue"></i> Kierunki
                            </a>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link " href="./examples/maps.html">*/}
                        {/*        <i className="ni ni-pin-3 text-orange"></i> Maps*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <a className="nav-link " href="/students">
                                <i className="ni ni-single-02 text-yellow"></i> Studenci
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/teachers">
                                <i className="ni ni-single-02 text-blue"></i> Wykładowcy
                            </a>
                        </li>

                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link " href="./examples/tables.html">*/}
                        {/*        <i className="ni ni-bullet-list-67 text-red"></i> Tables*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="./examples/login.html">*/}
                        {/*        <i className="ni ni-key-25 text-info"></i> Login*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="./examples/register.html">*/}
                        {/*        <i className="ni ni-circle-08 text-pink"></i> Register*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                    </ul>
                    <hr className="my-3"></hr>

                    <h6 className="navbar-heading text-muted"></h6>
                    <ul className="navbar-nav mb-md-3">
                        <li className="nav-item">
                            <a className="nav-link " href="/admins">
                                <i className="ni ni-single-02 text-green"></i>Administratorowie
                            </a>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link"*/}
                        {/*       href="https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html">*/}
                        {/*        <i className="ni ni-spaceship"></i> Getting started*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link"*/}
                        {/*       href="https://demos.creative-tim.com/argon-dashboard/docs/foundation/colors.html">*/}
                        {/*        <i className="ni ni-palette"></i> Foundation*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link"*/}
                        {/*       href="https://demos.creative-tim.com/argon-dashboard/docs/components/alerts.html">*/}
                        {/*        <i className="ni ni-ui-04"></i> Components*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>

    )
}


export default Navigation;