import React from 'react';
import globalConstants from "../../constants/Global";

export class User extends React.Component {

    constants = {
        roles: {
            ROLE_ADMIN: 'ROLE_ADMIN',
            ROLE_USER: 'ROLE_USER',
            ROLE_TEACHER: 'ROLE_TEACHER',
            ROLE_SUPER_USER: 'ROLE_SUPER_USER'
        },
        roleNames: {
            ROLE_ADMIN: 'Administrator',
            ROLE_USER: 'Student',
            ROLE_TEACHER: 'Wykładowca',
            ROLE_SUPER_USER: 'Starosta'
        }
    }

    user = this.props.user;

    render() {
        return (
            <tr id={this.user.id}>
                <td scope="row">{this.user.firstName}</td>
                <td>{this.user.lastName}</td>
                <td>{this.user.email}</td>
                <td>
                    {this.user.roles.map((role) => {
                        return (
                          <p>{this.constants.roleNames[role.name]}</p>
                        )
                    })}
                </td>
            </tr>
        )
    }
}
export default User;


