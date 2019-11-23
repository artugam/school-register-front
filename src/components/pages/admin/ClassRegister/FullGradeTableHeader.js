import React from 'react';
import Moment from "react-moment";
import SubjectScheduleAddModal from "../Subject/SubjectScheduleAddModal";
import FullGradeEditDescriptionModal from "./FullGradeEditDescriptionModal";
import SubjectDeleteModal from "../Subject/SubjectDeleteModal";
import FullGradeDeleteSection from "./FullGradeDeleteSection";

export class FullGradeTableHeader extends React.Component {

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false
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
            <th scope="col">

                <div className="d-inline" style={{width: "300px"}}>
                    <span style={this.sortButtonStyle} onClick={this.toggleModal}>
                     {this.props.description}
                    </span>
                    <span style={this.sortButtonStyle} onClick={this.toggleDeleteModal} className="close" aria-label="Close">
                     <span aria-hidden="true">×</span>
                    </span>
                </div>

                <FullGradeEditDescriptionModal
                    key={this.props.description}
                    isOpen={this.state.isModalOpen}
                    subject={this.props.subject}
                    toggleModal={this.toggleModal}
                    loadRecords={this.props.loadRecords}
                    description={this.props.description}
                />
                <FullGradeDeleteSection
                    key={this.props.description}
                    isOpen={this.state.isDeleteModalOpen}
                    subject={this.props.subject}
                    toggleModal={this.toggleDeleteModal}
                    loadRecords={this.props.loadRecords}
                    description={this.props.description}
                />
            </th>

        )
    }

    sortButtonStyle = {
        cursor: "pointer",
    };

}

export default FullGradeTableHeader;


