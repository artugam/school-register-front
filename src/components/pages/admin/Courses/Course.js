import React from 'react';
import PropTypes from "prop-types";
import CourseDeleteModal from "./CourseDeleteModal";
import CourseModal from "./CourseModal";
import Moment from "react-moment";
import userConstants from "../Users/UserConstants";
import globalConstants from "../../../constants/Global";
import auth from "../../../services/auth/LoggedUser";

export class Course extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    toggleDeleteModal = () => {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        })
    };

    render() {

        return (
            <tr id={this.props.record.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.props.record.name}</td>
                <td>{this.props.record.degree}</td>
                <td>{this.props.record.form}</td>
                <td>
                    <Moment format="MM-YYYY">
                        {this.props.record.startDate}
                    </Moment>
                </td>
                <td>{this.props.record.semesters}</td>
                <td>
                    {
                        this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ||
                        (this.props.record.foreman && this.props.record.foreman.id == auth.getLoggedUser().id) ?
                            <span>
                                <a style={actionButtonStyle} href={"/courses/" + this.props.record.id} title="Studenci kierunku">
                                    <i className="fa fa-users text-blue"></i>
                                </a>
                                <a style={actionButtonStyle} href={"/courses/" + this.props.record.id + "/groups/"} title="Grupy kierunku">
                                    <i className="fa fa-layer-group text-gray"></i>
                                </a>
                            </span>
                        : ''
                        }
                    {
                        this.props.roles.includes(userConstants.roles.ROLE_ADMIN) ?
                            <span>
                                <a style={actionButtonStyle} onClick={this.toggleModal} title="Edycja kierunku">
                                <i className="fa fa-edit text-yellow"></i>
                                <CourseModal
                                    loadRecords={this.props.loadRecords}
                                    key={this.props.record.id}
                                    isOpen={this.state.isModalOpen}
                                    toggleModal={this.toggleModal}
                                    action={'edit'}
                                    configOptions={this.props.configOptions}
                                    record={this.props.record}
                                />
                                </a>
                                <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń kierunek">
                                    <i className="fa fa-trash text-danger"></i>
                                    <CourseDeleteModal
                                        key={this.props.record.id}
                                        isOpen={this.state.isDeleteModalOpen}
                                        toggleModal={this.toggleDeleteModal}
                                        record={this.props.record}
                                        loadRecords={this.props.loadRecords}
                                    />
                                </a>
                            </span>
                            : ''
                    }


                </td>
            </tr>
        )
    }

}

const actionButtonStyle = {
    cursor: "pointer",
    // display: "block",
    padding: "0px 5px"
}

export default Course;


