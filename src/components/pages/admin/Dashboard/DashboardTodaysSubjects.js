import React from 'react';
import axios from "axios";
import {API_URL} from "../../../constants/Api";
import axiosService from "../../../services/axios/AxiosService";
import SortTableHeader from "../../../modules/SortTableHeader";
import Notification from "../Notifications/Notification";
import Pagination from "../../../services/paginators/Pagination";
import PaginationDasboard from "../../../services/paginators/PaginationDasboard";
import Moment from "react-moment";

export class DashboardTodaysSubjects extends React.Component {

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        loaded: false,
        records: {}
    };


    componentDidMount() {
        this.loadRecords();
    }


    loadRecords = (listParams) => {
        listParams = listParams ? listParams : this.state.listParams;

        var config = axiosService.getAuthConfig();
        return axios.get(API_URL + "auth/me/subjects/today", config)
            .then(response => {
                this.setState({records: response.data})
                if (!this.state.loaded) {
                    this.setState({loaded: true})
                }
                return response.data;
            })
            .catch((reason) => {
                axiosService.handleError(reason);
            });
    };

    render() {

        return (
            <div className="row mt-5">
                <div className="col-xl-12 mb-5 mb-xl-0">
                    <div className="card shadow">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">Dzisiejsze zajęcia</h3>
                                </div>
                            </div>
                        </div>
                        {this.state.records ?
                            <div className="table-responsive-md">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Przedmiot</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">Koniec</th>
                                        <th scope="col">Grupa</th>
                                        <th scope="col">Kierunek</th>
                                    </tr>
                                    </thead>
                                    {this.state.records.length > 0 ?
                                        <tbody className="tbody-dark">
                                        {this.state.records.map((record) => {
                                                return <tr key={record.id}>
                                                    <td>{record.subject.name}</td>
                                                    <td>
                                                        <Moment format="DD-MM-YYYY HH:mm">
                                                            {record.start}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        <Moment format="DD-MM-YYYY HH:mm">
                                                            {record.end}
                                                        </Moment>
                                                    </td>
                                                    <td>{record.subject.group.name}</td>
                                                    <td>{record.subject.group.course.name}</td>
                                                </tr>;
                                            }
                                        )}
                                        </tbody>
                                        : <tbody></tbody>
                                    }
                                </table>
                                {this.state.records.length > 0 ? '' :
                                    <div className="p-3 text-center d-block">Brak zajęć</div>
                                }
                            </div>
                            : ''
                        }
                    </div>
                </div>
            </div>

            // <div className="row mt-5">
            //     <div className="col-xl-12 mb-5 mb-xl-0">
            //         <div className="card shadow">
            //             <div className="card-header border-0">
            //                 <div className="row align-items-center">
            //                     <div className="col">
            //                         <h3 className="mb-0">Page visits</h3>
            //                     </div>
            //                     <div className="col text-right">
            //                         <a href="#!" className="btn btn-sm btn-primary">See all</a>
            //                     </div>
            //                 </div>
            //             </div>
            //
            //
            //             <div className="table-responsive">
            //                 {this.state.loaded ?
            //                     <table className="table align-items-center table-flush">
            //                         <thead className="thead-light">
            //                         <tr>
            //                             <th scope="col">Przedmiot</th>
            //                             <th scope="col">Start</th>
            //                             <th scope="col">Koniec</th>
            //                             <th scope="col">Kierunek</th>
            //                         </tr>
            //                         </thead>
            //                         {/*<tbody>*/}
            //
            //                         {/*<tr>*/}
            //                         {/*    <th scope="row">*/}
            //                         {/*        /argon/*/}
            //                         {/*    </th>*/}
            //                         {/*    <td>*/}
            //                         {/*        4,569*/}
            //                         {/*    </td>*/}
            //                         {/*    <td>*/}
            //                         {/*        340*/}
            //                         {/*    </td>*/}
            //                         {/*    <td>*/}
            //                         {/*        <i className="fas fa-arrow-up text-success mr-3"/> 46,53%*/}
            //                         {/*    </td>*/}
            //                         {/*</tr>*/}
            //                         {/*</tbody>*/}
            //                     </table>
            //
            //                     : ""}
            //                 {
            //
            //                 }
            //                 <div className="p-3 text-center d-block">Brak zajęć</div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }

}

const actionButtonStyle = {
    cursor: "pointer",
    // display: "block",
    padding: "0px 5px"
}

export default DashboardTodaysSubjects;


