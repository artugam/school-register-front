import React from 'react';
import CourseStudentDeleteModal from "./CourseStudentDeleteModal";
import CourseForemanModal from "./CourseForemanModal";
import userConstants from "../Users/UserConstants";


export class CourseStudent extends React.Component {
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
                <td scope="row">{this.props.record.firstName}</td>
                <td>{this.props.record.lastName}</td>
                <td>{this.props.record.uniqueNumber}</td>
                <td>{this.props.record.email}</td>
                {/*<td>{this.props.record.currentSemester}</td>*/}
                <td>
                    {
                        this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                            <a style={actionButtonStyle} onClick={this.toggleModal} title="Mianuj starostą">
                                <i className="fa fa-user-alt text-primary"></i>
                                <CourseForemanModal
                                    loadRecords={this.props.loadRecords}
                                    key={this.props.record.id}
                                    isOpen={this.state.isModalOpen}
                                    toggleModal={this.toggleModal}
                                    record={this.props.record}
                                    course={this.props.course}
                                    loadCourse={this.props.loadCourse}
                                />
                            </a>
                            : ''
                    }

                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń z kursu">
                        <i className="fa fa-trash text-danger"></i>
                        <CourseStudentDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            record={this.props.record}
                            loadRecords={this.props.loadRecords}
                            course={this.props.course}
                            deleteCallBack={this.props.deleteCallBack}
                        />
                    </a>

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

export default CourseStudent;


