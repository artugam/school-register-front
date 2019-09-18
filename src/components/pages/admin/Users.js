import React from 'react';
import {API_URL} from "../../constants/Api";
import axios from 'axios'
import '../../assets/js/plugins/nucleo/css/nucleo.css'
import '../../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css'
import '../../assets/css/argon-dashboard.css'
import Navigation from "../../layout/Navigation";
import Brand from "../../layout/Brand";
import Footer from "../../layout/Footer";
import axiosService from "../../services/axios/AxiosService";
import globalConstants from "../../constants/Global";


export class Users extends React.Component {

    state = {
        user: '',
        users: [],
    };

    componentDidMount() {
        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        axios.get(API_URL + "users", axiosService.getAuthConfig())
            .then(response => {

                this.setState({users: response.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }


    render() {
        // const greeting =
        return (
            <div>
                <Navigation user={this.state.user}/>

                <div className="main-content">
                    {/* Navbar */}
                    <Brand user={this.state.user}/>
                    {/* End Navbar */}
                    {/* Header */}

                    <div className="container-fluid mt--7">
                        <div className="row mt-5">
                            <div className="col-xl-8 mb-5 mb-xl-0">
                                <div className="card shadow">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Page visits</h3>
                                            </div>
                                            <div className="col text-right">
                                                <a href="#!" className="btn btn-sm btn-primary">See all</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {/* Projects table */}
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Page name</th>
                                                <th scope="col">Visitors</th>
                                                <th scope="col">Unique users</th>
                                                <th scope="col">Bounce rate</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row">
                                                    /argon/
                                                </th>
                                                <td>
                                                    4,569
                                                </td>
                                                <td>
                                                    340
                                                </td>
                                                <td>
                                                    <i className="fas fa-arrow-up text-success mr-3"/> 46,53%
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    /argon/index.html
                                                </th>
                                                <td>
                                                    3,985
                                                </td>
                                                <td>
                                                    319
                                                </td>
                                                <td>
                                                    <i className="fas fa-arrow-down text-warning mr-3"/> 46,53%
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    /argon/charts.html
                                                </th>
                                                <td>
                                                    3,513
                                                </td>
                                                <td>
                                                    294
                                                </td>
                                                <td>
                                                    <i className="fas fa-arrow-down text-warning mr-3"/> 36,49%
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    /argon/tables.html
                                                </th>
                                                <td>
                                                    2,050
                                                </td>
                                                <td>
                                                    147
                                                </td>
                                                <td>
                                                    <i className="fas fa-arrow-up text-success mr-3"/> 50,87%
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    /argon/profile.html
                                                </th>
                                                <td>
                                                    1,795
                                                </td>
                                                <td>
                                                    190
                                                </td>
                                                <td>
                                                    <i className="fas fa-arrow-down text-danger mr-3"/> 46,53%
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="col-xl-4">*/}
                            {/*    <div className="card shadow">*/}
                            {/*        <div className="card-header border-0">*/}
                            {/*            <div className="row align-items-center">*/}
                            {/*                <div className="col">*/}
                            {/*                    <h3 className="mb-0">Social traffic</h3>*/}
                            {/*                </div>*/}
                            {/*                <div className="col text-right">*/}
                            {/*                    <a href="#!" className="btn btn-sm btn-primary">See all</a>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="table-responsive">*/}
                            {/*            /!* Projects table *!/*/}
                            {/*            <table className="table align-items-center table-flush">*/}
                            {/*                <thead className="thead-light">*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="col">Referral</th>*/}
                            {/*                    <th scope="col">Visitors</th>*/}
                            {/*                    <th scope="col"/>*/}
                            {/*                </tr>*/}
                            {/*                </thead>*/}
                            {/*                <tbody>*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="row">*/}
                            {/*                        Facebook*/}
                            {/*                    </th>*/}
                            {/*                    <td>*/}
                            {/*                        1,480*/}
                            {/*                    </td>*/}
                            {/*                    <td>*/}
                            {/*                        <div className="d-flex align-items-center">*/}
                            {/*                            <span className="mr-2">60%</span>*/}
                            {/*                            <div>*/}
                            {/*                                <div className="progress">*/}
                            {/*                                    <div className="progress-bar bg-gradient-danger"*/}
                            {/*                                         role="progressbar" aria-valuenow={60}*/}
                            {/*                                         aria-valuemin={0} aria-valuemax={100}*/}
                            {/*                                         style={{width: '60%'}}/>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                </tr>*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="row">*/}
                            {/*                        Facebook*/}
                            {/*                    </th>*/}
                            {/*                    <td>*/}
                            {/*                        5,480*/}
                            {/*                    </td>*/}
                            {/*                    <td>*/}
                            {/*                        <div className="d-flex align-items-center">*/}
                            {/*                            <span className="mr-2">70%</span>*/}
                            {/*                            <div>*/}
                            {/*                                <div className="progress">*/}
                            {/*                                    <div className="progress-bar bg-gradient-success"*/}
                            {/*                                         role="progressbar" aria-valuenow={70}*/}
                            {/*                                         aria-valuemin={0} aria-valuemax={100}*/}
                            {/*                                         style={{width: '70%'}}/>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                </tr>*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="row">*/}
                            {/*                        Google*/}
                            {/*                    </th>*/}
                            {/*                    <td>*/}
                            {/*                        4,807*/}
                            {/*                    </td>*/}
                            {/*                    <td>*/}
                            {/*                        <div className="d-flex align-items-center">*/}
                            {/*                            <span className="mr-2">80%</span>*/}
                            {/*                            <div>*/}
                            {/*                                <div className="progress">*/}
                            {/*                                    <div className="progress-bar bg-gradient-primary"*/}
                            {/*                                         role="progressbar" aria-valuenow={80}*/}
                            {/*                                         aria-valuemin={0} aria-valuemax={100}*/}
                            {/*                                         style={{width: '80%'}}/>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                </tr>*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="row">*/}
                            {/*                        Instagram*/}
                            {/*                    </th>*/}
                            {/*                    <td>*/}
                            {/*                        3,678*/}
                            {/*                    </td>*/}
                            {/*                    <td>*/}
                            {/*                        <div className="d-flex align-items-center">*/}
                            {/*                            <span className="mr-2">75%</span>*/}
                            {/*                            <div>*/}
                            {/*                                <div className="progress">*/}
                            {/*                                    <div className="progress-bar bg-gradient-info"*/}
                            {/*                                         role="progressbar" aria-valuenow={75}*/}
                            {/*                                         aria-valuemin={0} aria-valuemax={100}*/}
                            {/*                                         style={{width: '75%'}}/>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                </tr>*/}
                            {/*                <tr>*/}
                            {/*                    <th scope="row">*/}
                            {/*                        twitter*/}
                            {/*                    </th>*/}
                            {/*                    <td>*/}
                            {/*                        2,645*/}
                            {/*                    </td>*/}
                            {/*                    <td>*/}
                            {/*                        <div className="d-flex align-items-center">*/}
                            {/*                            <span className="mr-2">30%</span>*/}
                            {/*                            <div>*/}
                            {/*                                <div className="progress">*/}
                            {/*                                    <div className="progress-bar bg-gradient-warning"*/}
                            {/*                                         role="progressbar" ari

                            a-valuenow={30}*/}
                            {/*                                         aria-valuemin={0} aria-valuemax={100}*/}
                            {/*                                         style={{width: '30%'}}/>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                </tr>*/}
                            {/*                </tbody>*/}
                            {/*            </table>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        {/*Footer*/}
                        <Footer/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Users;


