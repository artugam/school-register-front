import React from 'react';
import Moment from "react-moment";
import SubjectScheduleAddModal from "../Subject/SubjectScheduleAddModal";
import SubjectDeleteModal from "../Subject/SubjectDeleteModal";
import SubjectSchedulePresenceModal from "../Subject/SubjectSchedulePresenceModal";
import userConstants from "../Users/UserConstants";


export class FullSubjectScheduleRow extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        isPresenceModalOpen: false,
        presences: {},
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
        this.props.record.presences.map((presence) => {
            this.state.presences[presence.id] = presence.presenceStatus ? presence.presenceStatus : " ";
        });
    }


    handleOnChange = e => {
        const {id, value} = e.target;
        this.updatePresence(id, value);

        this.props.handlePresenceChange(id, value);
    };

    updatePresence = (id, value) => {
        let presences = this.state.presences;
        presences[id] = value;
        this.setState(presences);
    };

    getColor = (value) => {

        switch (value) {
            case "Obecny":
                return "#36a849";
            case "Spóźniony":
                return "#4c87e6";
            case "Usprawiedliwiony":
                return "#7b8696";
            case "Nieobecny":
                return "#d43737";
            default:
                return "ffffff"
        }
    };

    render() {
        return (

            <tr style={{"borderBottom": "2px solid #adb5bd"}}>
                {
                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                        <td scope="row">
                            {this.props.record.user.lastName} {this.props.record.user.firstName} {this.props.record.user.uniqueNumber ? "- " + this.props.record.user.uniqueNumber : ''}
                        </td>
                        : ''
                }
                {
                    this.props.record.presences.map((presence) => {
                        return <td key={presence.id}>
                            {
                                this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                                    <select
                                        type="text"
                                        // className={"form-control " + (this.state.formErrors.type ? "is-invalid" : '')}
                                        className={"form-control"}
                                        id={presence.id}
                                        onChange={this.handleOnChange}
                                        value={this.state.presences[presence.id]}
                                        placeholder="Rodzaj zajęć"
                                        style={{backgroundColor: this.getColor(this.state.presences[presence.id])}}

                                    >
                                        {
                                            this.props.options.types ?
                                                this.props.options.types.map((role) => {
                                                    return <option
                                                        key={role}
                                                        value={role}
                                                        style={{backgroundColor: "#ffffff"}}
                                                    >
                                                        {role}
                                                    </option>
                                                })
                                                : ''
                                        }
                                    </select>
                                    : (this.state.presences[presence.id] !== " "? this.state.presences[presence.id] : "-")
                            }
                        </td>
                    })
                }
            </tr>
        )
    }

}

export default FullSubjectScheduleRow;


