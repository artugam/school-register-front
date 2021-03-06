import React from 'react';
import UserModal from "./UserModal";
import userConstants from "./UserConstants";
import {UserDeleteModal} from "./UserDeleteModal";
import UserStatusModal from "./UserStatusModal";
import PropTypes from "prop-types";
import UserPasswordModal from "./UserPasswordModal";

export class User extends React.Component {

    constants = userConstants;

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        isBlockModalOpen: false,
        isUnblockModalOpen: false,
        isPasswordModalOpen: false
    }

    togglePasswordModal = () => {
        this.setState({
            isPasswordModalOpen: !this.state.isPasswordModalOpen
        })
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
            if (allRoles.includes(role)) {
                return userConstants.roleNames[role];
            }
        }
    };

    render() {
        return (
            <tr id={this.props.user.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.uniqueNumber}</td>
                <td>{this.props.user.email}</td>
                {/*<td>*/}
                {/*    {this.getHighestRole(this.props.user.roles)}*/}
                {/*</td>*/}
                <td>
                    <span className={`badge badge-` + (this.props.user.enabled ? "success" : "danger")}>
                        {this.props.user.enabled ? "Aktywny" : "Zablokowany"}
                    </span>
                    <br></br>
                    {
                        !this.props.user.enabled ?

                            <span className={`badge badge-primary`}>
                                {this.props.user.lockReason}
                            </span>
                            : ''
                    }

                </td>
                <td>
                    <a style={actionButtonStyle} onClick={this.togglePasswordModal} title="Ustawienie hasła">
                        <i className="fa fa-key text-black"></i>
                        <UserPasswordModal
                            loadUsers={this.props.loadUsers}
                            key={this.props.user.id}
                            isOpen={this.state.isPasswordModalOpen}
                            toggleModal={this.togglePasswordModal}
                            allowedRoles={this.props.allowedRoles}
                            user={this.props.user}
                        />
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleModal} title="Edycja użytkownika">
                        <i className="fa fa-edit text-yellow"></i>
                        <UserModal
                            loadUsers={this.props.loadUsers}
                            key={this.props.user.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            action={'edit'}
                            allowedRoles={this.props.allowedRoles}
                            user={this.props.user}
                        />
                    </a>
                    <a className={!this.props.user.enabled ? "d-none" : ''} style={actionButtonStyle} title="Zablokowanie użytkownika"
                       onClick={this.toggleBlockModal}>
                        <i className="fa fa-lock text-primary"></i>
                        <UserStatusModal
                            key={this.props.user.id}
                            isOpen={this.state.isBlockModalOpen}
                            toggleModal={this.toggleBlockModal}
                            user={this.props.user}
                            loadUsers={this.props.loadUsers}
                            action={"block"}
                        />
                    </a>
                    <a className={this.props.user.enabled ? "d-none" : ''} style={actionButtonStyle} title="Odblokowanie użytkownika"
                       onClick={this.toggleUnBlockModal}>
                        <i className="fa fa-lock-open text-success"></i>
                        <UserStatusModal
                            key={this.props.user.id}
                            isOpen={this.state.isUnblockModalOpen}
                            toggleModal={this.toggleUnBlockModal}
                            user={this.props.user}
                            loadUsers={this.props.loadUsers}
                            action={"unblock"}
                        />
                    </a>


                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usunięcie użytkownika">
                        <i className="fa fa-trash text-danger"></i>
                        <UserDeleteModal
                            key={this.props.user.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            user={this.props.user}
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
    // display: "block",
    padding: "0px 5px"
}

export default User;


