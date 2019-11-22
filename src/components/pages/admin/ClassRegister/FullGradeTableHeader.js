import React from 'react';
import Moment from "react-moment";
import SubjectScheduleAddModal from "../Subject/SubjectScheduleAddModal";
import FullGradeEditDescriptionModal from "./FullGradeEditDescriptionModal";

export class FullGradeTableHeader extends React.Component {

    state = {
        isModalOpen: false
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    render() {
        return (
            <th style={this.sortButtonStyle} onClick={this.toggleModal} scope="col">

                {this.props.description}

                <FullGradeEditDescriptionModal
                    key={this.props.description}
                    isOpen={this.state.isModalOpen}
                    subject={this.props.subject}
                    toggleModal={this.toggleModal}
                    loadRecords={this.props.loadRecords}
                    description={this.props.description}
                />
            </th>

        )
    }

    sortButtonStyle = {
        cursor: "pointer",
        width: "300px"
    };

}

export default FullGradeTableHeader;


