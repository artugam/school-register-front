import React from 'react';
import Moment from "react-moment";
import SubjectScheduleAddModal from "../Subject/SubjectScheduleAddModal";
import userConstants from "../Users/UserConstants";

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
        if(!this.props.roles.includes(userConstants.roles.ROLE_TEACHER)) {
            return;
        }
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    render() {
        return (
            <th
                style={this.sortButtonStyle}
                onClick={this.toggleModal}
                scope="col"
            >

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
        cursor: this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ? "pointer" : 'default',
        width: "300px"
    };

}

export default FullSubjectScheduleTableHeader;


