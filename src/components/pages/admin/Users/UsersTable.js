import React from 'react';
import User from "./User";
import UserModal from "./UserModal";
import globalConstants from "../../../constants/Global";
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import Loader from "react-loader-spinner";
import Pagination from "../../../services/paginators/Pagination";


export class UsersTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: [],
        // exampleItems: this.props.users.length > 0 ? this.props.users : [],
        exampleItems: [],
        pageOfItems: []

    };

    constructor() {
        super();

        // an example array of 150 items to be paged
        var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
        this.state.exampleItems = exampleItems;
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    // state = {
    //     isModalOpen: false,
    //     allowedRoles: [],
    //     // exampleItems: this.props.users,
    //     exampleItems: [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) })),
    //     pageOfItems: []
    // };

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
            console.log(this.state.exampleItems);

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
                {/*<Loader*/}
                {/*    type="BallTriangle"*/}
                {/*    color="#00BFFF"*/}
                {/*    style={{*/}
                {/*        "position": "fixed",*/}
                {/*        "width": "100",*/}
                {/*        "height": "100",*/}
                {/*    }}*/}
                {/*    // height={100}*/}
                {/*    // width={100}*/}
                {/*    // timeout={3000} //3 secs*/}

                {/*/>*/}
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
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        {/*{this.props.users.map((user) => {*/}
                        {/*    return (<User*/}
                        {/*        user={user}*/}
                        {/*        key={user.id}*/}
                        {/*        allowedRoles={this.state.allowedRoles}*/}
                        {/*        loadUsers={this.props.loadUsers}*/}
                        {/*    />);*/}
                        {/*})}*/}
                        </tbody>

                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </table>
                </div>
            </div>

        )
    }
}

export default UsersTable;


