import React from 'react';
import PropTypes from "prop-types";
import Moment from "react-moment";
import GroupSubjectsAddModal from "../GroupSubjects/GroupSubjectsAddModal";
import SubjectScheduleAddModal from "./SubjectScheduleAddModal";

export class FullSubjectScheduleTableHeader extends React.Component {

    sortDirection = {
        DESC : "DESC",
        ASC : "ASC"
    };

    state = {
        direction: this.sortDirection.ASC,
        isModalOpen: false
    };

    handleSort = () => {
        if(!this.props.field) {
            return;
        }
        var direction = this.sortDirection.DESC;
        if(this.state.direction == this.sortDirection.DESC) {
            direction = this.sortDirection.ASC;
        }

        this.setState({direction: direction});
        this.props.handleSort(this.props.field, direction);
    };

    getSortIcon = () => {
        if(!this.props.field) {
            return '';
        }
        return (
            <i className="fa fa-arrows-alt-v"></i>
        );
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    render() {
        return (
            <th style={this.sortButtonStyle} onClick={this.toggleModal} scope="col">

                <Moment format="DD-MM-YYYY">
                    {this.props.schedule.start}
                </Moment>

                <SubjectScheduleAddModal
                    key={this.props.schedule.id}
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    loadRecords={function () {
                        //don nothing
                    }}
                    subject={this.props.subject}
                    record={this.props.schedule}
                    action={'edit'}
                />


            </th>

        )
    }

    sortButtonStyle = {
        cursor: "pointer"
    };

}

export default FullSubjectScheduleTableHeader;


