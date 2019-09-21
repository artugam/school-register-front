import React from 'react';
import User from "./User";
import UserModal from "./UserModal";
import globalConstants from "../../../constants/Global";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";

export class UsersTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: []
    };



    componentDidMount() {
        if (!localStorage.getItem(globalConstants.authData)) {
            this.props.history.push('/');
            return;
        }

        axios.get(API_URL + "roles", axiosService.getAuthConfig())
            .then(response => {
                this.setState({allowedRoles: response.data});
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    }

    toggleModal = () => {

        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    render() {
        return (
            <div className="card shadow">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Użytkownicy</h3>
                        </div>
                        <div className="col text-right">
                            {/*<a href="#!" className="btn btn-sm btn-primary">See all</a>*/}
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">Dodaj Nowego Użytkownika</button>
                            <UserModal isOpen={this.state.isModalOpen} action={"add"} toggleModal={this.toggleModal} allowedRoles={this.state.allowedRoles}/>
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
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.users.map((user) => {
                            return (<User
                                user={user}
                                key={user.id}
                                allowedRoles={this.state.allowedRoles}
                            />);
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default UsersTable;


