import React from 'react';
import UserModal from "./UserModal";
import userConstants from "./UserConstants";
import {UserDeleteModal} from "./UserDeleteModal";
import UserStatusModal from "./UserStatusModal";
import PropTypes from "prop-types";

export class User extends React.Component {

    constants = userConstants;
    user = this.props.user;

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

    getHighestRole = (roles) => {
        var allRoles = [];
        roles.map((role) => {
            allRoles.push(role.name);
        });


        for (let role in userConstants.roles) {
            if(allRoles.includes(role)) {
                return userConstants.roleNames[role];
            }
        }

    };

    loadUsers = () => {
        this.props.loadUsers();
        this.forceUpdate();
    };

    render() {
        return (
            <tr id={this.user.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.user.firstName}</td>
                <td>{this.user.lastName}</td>
                <td>{this.user.email}</td>
                <td>
                    {this.getHighestRole(this.user.roles)}
                </td>
                <td>
                    <span className={`badge badge-` + (this.props.user.enabled ? "success" : "danger")}>
                    {this.props.user.enabled ? "Aktywny" : "Zablokowany"}
                    </span>
                </td>
                <td className="row">
                    <a style={actionButtonStyle} onClick={this.toggleModal}>
                        <i className="fa fa-edit text-yellow"></i>
                        <UserModal
                            key={this.user.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            action={'edit'}
                            allowedRoles={this.props.allowedRoles}
                            user={this.user}
                            loadUsers={this.loadUsers}
                        />
                    </a>
                    {
                        this.props.user.enabled ?
                            <a style={actionButtonStyle} onClick={this.toggleBlockModal}>
                                <i className="fa fa-lock text-primary"></i>
                                <UserStatusModal
                                    key={this.user.id}
                                    isOpen={this.state.isBlockModalOpen}
                                    toggleModal={this.toggleBlockModal}
                                    user={this.user}
                                    loadUsers={this.props.loadUsers}
                                    action={"block"}
                                />
                            </a>
                            :
                            <a style={actionButtonStyle} onClick={this.toggleUnBlockModal}>
                                <i className="fa fa-lock-open text-success"></i>
                                <UserStatusModal
                                    key={this.user.id}
                                    isOpen={this.state.isUnblockModalOpen}
                                    toggleModal={this.toggleUnBlockModal}
                                    user={this.user}
                                    loadUsers={this.props.loadUsers}
                                    action={"unblock"}
                                />
                            </a>
                    }

                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal}>
                        <i className="fa fa-trash text-danger"></i>
                        <UserDeleteModal
                            key={this.user.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            user={this.user}
                            loadUsers={this.props.loadUsers}
                        />
                    </a>

                </td>
            </tr>
        )
    }

}

const actionButtonStyle = {
    cursor: "pointer",
    display: "block",
    padding: "0px 5px"
}

export default User;


