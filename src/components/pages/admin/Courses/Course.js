import React from 'react';
import PropTypes from "prop-types";

export class Course extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        isBlockModalOpen: false,
        isUnblockModalOpen: false
    }

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

    toggleBlockModal = () => {
        this.setState({
            isBlockModalOpen: !this.state.isBlockModalOpen
        })
    };

    toggleUnBlockModal = () => {
        this.setState({
            isUnblockModalOpen: !this.state.isUnblockModalOpen
        })
    };

    render() {
        return (
            <tr id={this.props.record.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.props.record.name}</td>
                <td>{this.props.record.degree}</td>
                <td>{this.props.record.form}</td>
                <td>{this.props.record.semesters}</td>
                <td className="row">
                    {/*<a style={actionButtonStyle} onClick={this.toggleModal}>*/}
                    {/*    <i className="fa fa-edit text-yellow"></i>*/}
                    {/*    <UserModal*/}
                    {/*        loadUsers={this.props.loadUsers}*/}
                    {/*        key={this.props.user.id}*/}
                    {/*        isOpen={this.state.isModalOpen}*/}
                    {/*        toggleModal={this.toggleModal}*/}
                    {/*        action={'edit'}*/}
                    {/*        allowedRoles={this.props.allowedRoles}*/}
                    {/*        user={this.props.user}*/}
                    {/*    />*/}
                    {/*</a>*/}
                    {/*<a className={!this.props.user.enabled ? "d-none" : ''}  style={actionButtonStyle} onClick={this.toggleBlockModal}>*/}
                    {/*    <i className="fa fa-lock text-primary"></i>*/}
                    {/*    <UserStatusModal*/}
                    {/*        key={this.props.user.id}*/}
                    {/*        isOpen={this.state.isBlockModalOpen}*/}
                    {/*        toggleModal={this.toggleBlockModal}*/}
                    {/*        user={this.props.user}*/}
                    {/*        loadUsers={this.props.loadUsers}*/}
                    {/*        action={"block"}*/}
                    {/*    />*/}
                    {/*</a>*/}
                    {/*<a  className={this.props.user.enabled ? "d-none" : ''} style={actionButtonStyle} onClick={this.toggleUnBlockModal}>*/}
                    {/*    <i className="fa fa-lock-open text-success"></i>*/}
                    {/*    <UserStatusModal*/}
                    {/*        key={this.props.user.id}*/}
                    {/*        isOpen={this.state.isUnblockModalOpen}*/}
                    {/*        toggleModal={this.toggleUnBlockModal}*/}
                    {/*        user={this.props.user}*/}
                    {/*        loadUsers={this.props.loadUsers}*/}
                    {/*        action={"unblock"}*/}
                    {/*    />*/}
                    {/*</a>*/}


                    {/*<a  style={actionButtonStyle} onClick={this.toggleDeleteModal}>*/}
                    {/*    <i className="fa fa-trash text-danger"></i>*/}
                    {/*    <UserDeleteModal*/}
                    {/*        key={this.props.user.id}*/}
                    {/*        isOpen={this.state.isDeleteModalOpen}*/}
                    {/*        toggleModal={this.toggleDeleteModal}*/}
                    {/*        user={this.props.user}*/}
                    {/*        loadUsers={this.props.loadUsers}*/}
                    {/*    />*/}
                    {/*</a>*/}

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


