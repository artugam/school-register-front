import React from 'react';
import PropTypes from "prop-types";
import CourseDeleteModal from "./CourseDeleteModal";
import CourseModal from "./CourseModal";
import Moment from "react-moment";

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
                {/*<td>{this.props.record.currentSemester}</td>*/}
                <td className="row">
                    <a style={actionButtonStyle} href={"/courses/" + this.props.record.id}>
                        <i className="fa fa-info-circle text-blue"></i>
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleModal}>
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
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal}>
                        <i className="fa fa-trash text-danger"></i>
                        <CourseDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            record={this.props.record}
                            loadRecords={this.props.loadRecords}
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

export default Course;


