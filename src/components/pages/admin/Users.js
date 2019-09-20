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
import User from "./User";


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
                console.log(this.state.users);
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
                        <div className="row mt-0">
                            <div className="col-xl-12 mb-5 mb-xl-0">
                                <div className="card shadow">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Użytkownicy</h3>
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
                                                <th scope="col">Imie</th>
                                                <th scope="col">Nazwisko</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Rola</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.users.map((user) => {
                                                return (<User user={user} key={user.id}/>);
                                            })}
                                            </tbody>
                                        </table>
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

export default Users;


