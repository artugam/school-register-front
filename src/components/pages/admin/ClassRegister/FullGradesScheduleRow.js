import React from 'react';
import userConstants from "../Users/UserConstants";


export class FullGradesScheduleRow extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        isPresenceModalOpen: false,
        grades: {},
        loaded: false
    };

    toggleModal = (e) => {
        this.setState({
            // isModalOpen: !this.state.isModalOpen
            isModalOpen: !this.state.isModalOpen
        })
    };


    toggleModalOn = (e) => {
        if (this.state.isModalOpen) {
            return;
        }
        this.setState({
            // isModalOpen: !this.state.isModalOpen
            isModalOpen: !this.state.isModalOpen
        })
    };

    toggleDeleteModal = () => {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        })
    };
    togglePresenceModal = () => {
        this.setState({
            isPresenceModalOpen: !this.state.isPresenceModalOpen
        })
    };

    componentWillMount() {
        this.props.record.grades.map((grade) => {
            this.state.grades[grade.id] = grade.grade ? grade.grade : " ";
            // this.state.grades[grade.id] = grade.grade && grade.grade !== 0 ? grade.grade : " ";
        });
    }


    handleOnChange = e => {
        const {id, value} = e.target;
        this.updatePresence(id, value);

        this.props.handlePresenceChange(id, value);
    };

    updatePresence = (id, value) => {
        let grades = this.state.grades;
        grades[id] = value;
        this.setState(grades);
    };

    render() {
        return (
            <tr style={{"borderBottom": "2px solid #adb5bd"}}>
                {
                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                        <td scope="row" style={{backgroundColor: "#f6f9fc"}}>
                            <b className="text-sm">
                            {this.props.record.user.lastName} {this.props.record.user.firstName} {this.props.record.user.uniqueNumber ? "- " + this.props.record.user.uniqueNumber : ''}
                            </b>
                        </td>
                        : ''
                }

                {
                    this.props.record.grades.map((grade) => {
                        return <td key={grade.id}>
                            {
                                this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                                    <select
                                        type="text"
                                        // className={"form-control " + (this.state.formErrors.type ? "is-invalid" : '')}
                                        className={"form-control form-control-sm"}
                                        id={grade.id}
                                        onChange={this.handleOnChange}
                                        value={this.state.grades[grade.id]}
                                        placeholder="Rodzaj zajęć"
                                    >
                                        {
                                            this.props.options.types ?
                                                this.props.options.types.map((role) => {
                                                    return <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                })
                                                : ''
                                        }
                                    </select>
                                    : this.state.grades[grade.id] ? this.state.grades[grade.id] : '-'
                            }
                        </td>
                    })
                }
            </tr>
        )
    }

}

export default FullGradesScheduleRow;


