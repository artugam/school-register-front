import React from 'react';
import Pagination from "../../../services/paginators/Pagination";
import SortTableHeader from "../../../modules/SortTableHeader";


export class CoursesTable extends React.Component {

    state = {
        isModalOpen: false,
        allowedRoles: [],
        pageOfItems: []

    };

    constructor() {
        super();
        this.onChangePage = this.onChangePage.bind(this);
    }


    onChangePage(pager) {
        var config = this.props.userListParams;
        config.page = pager.currentPage;
        config.records = pager.pageSize;

        this.props.updateListQueryParams(config);
        this.props.loadRecords();
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleOnSearch = (target) => {
        if (target.charCode == 13) {
            var config = this.props.userListParams;
            config.search = target.target.value;
            config.page = 1;

            this.props.updateListQueryParams(config);
            this.props.loadRecords();
        }
    };

    handleSort = (field, direction) => {
        var config = this.props.userListParams;
        config.sortField = field;
        config.sortDirection = direction;
        config.page = 1;

        this.props.updateListQueryParams(config);
        this.props.loadRecords();
    };

    render() {
        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="mb-0 p-2">Użytkownicy</h2>
                        </div>
                        <div className="col text-right">
                            {/*<a href="#!" className="btn btn-sm btn-primary">See all</a>*/}
                            <button onClick={this.toggleModal} className="btn btn-sm btn-primary">
                                Dodaj Nowy Kierunek
                            </button>
                            {/*<UserModal isOpen={this.state.isModalOpen} action={"add"} toggleModal={this.toggleModal}*/}
                            {/*           allowedRoles={this.state.allowedRoles}*/}
                            {/*           loadUsers={this.props.loadUsers}*/}
                            {/*           userListParams={this.props.userListParams}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-3 text-right">
                            <input type="text"
                                   className={"form-control"}
                                   id="search" onKeyPress={this.handleOnSearch}
                                   onChange={this.handleOnChange}
                                   placeholder="Szukaj"></input>
                        </div>
                    </div>
                </div>
                {this.props.records.content ?
                    <div className="table-responsive-md">
                        {/* Projects table */}

                        <table className="table align-items-center table-flush table-bordered text-center">

                            <thead className="thead-light">
                            <tr>
                                <SortTableHeader field={"firstName"} text={"Imie"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"lastName"} text={"Nazwisko"} handleSort={this.handleSort}/>
                                <SortTableHeader field={"email"} text={"Email"} handleSort={this.handleSort}/>
                                <SortTableHeader text={"Rola"}/>
                                <SortTableHeader field={"enabled"} text={"Status"} handleSort={this.handleSort}/>
                                <th scope="col"></th>
                            </tr>
                            </thead>

                            {/*{this.props.users.content.length > 0 ?*/}
                            {/*    <tbody className="tbody-dark">*/}
                            {/*    {this.props.users.content.map((user) => {*/}
                            {/*            return (<User*/}
                            {/*                user={user}*/}
                            {/*                key={user.id}*/}
                            {/*                allowedRoles={this.state.allowedRoles}*/}
                            {/*                loadUsers={this.props.loadUsers}*/}
                            {/*            />);*/}
                            {/*        }*/}
                            {/*    )}*/}
                            {/*    </tbody>*/}
                            {/*    : ''*/}
                            {/*}*/}
                        </table>
                        {this.props.records.content.length > 0 ? '' :
                            <div className="p-3 text-center d-block">Nie znaleziono rekordów</div>
                        }

                        <Pagination items={this.props.records.content} onChangePage={this.onChangePage}
                                    initialPage={this.props.records.page} pageSize={this.props.records.size}
                                    totalPages={this.props.records.totalPages}
                                    totalElements={this.props.records.totalElements}
                                    isLast={this.props.records.last}
                        />

                    </div>
                    : ''

                }
            </div>

        )
    }
}

export default CoursesTable;


