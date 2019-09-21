import React from 'react';
import UserModal from "./UserModal";
import userConstants from "./UserConstants";

export class User extends React.Component {

    constants = userConstants;
    user = this.props.user;

    state = {
        isModalOpen: false
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    render() {
        return (
            <tr id={this.user.id}>
                <td scope="row">{this.user.firstName}</td>
                <td>{this.user.lastName}</td>
                <td>{this.user.email}</td>
                <td>
                    {this.user.roles.map((role) => {
                        return (
                            <p key={role.id}>{this.constants.roleNames[role.name]}</p>
                        )
                    })}
                </td>
                <td>
                    <a style={{cursor: "pointer"}} onClick={this.toggleModal}>
                        <i className="fa fa-edit text-yellow"></i>
                        <UserModal
                            key={this.user.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            action={'edit'}
                            allowedRoles={this.props.allowedRoles}
                        />
                    </a>
                </td>
            </tr>
        )
    }
}

export default User;


