import React from 'react';
import Moment from "react-moment";
import SubjectScheduleAddModal from "./SubjectScheduleAddModal";
import SubjectDeleteModal from "./SubjectDeleteModal";
import SubjectSchedulePresenceModal from "./SubjectSchedulePresenceModal";


export class SubjectSchedule extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
        isPresenceModalOpen: false,
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

    render() {

        return (
            <tr id={this.props.record.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">
                    <Moment format=" DD-MM-YYYY HH:mm">
                        {this.props.record.start}
                    </Moment>

                </td>
                <td>
                    <Moment format="DD-MM-YYYY HH:mm">
                        {this.props.record.end}
                    </Moment>
                </td>
                <td>
                    {this.props.record.description}
                </td>
                <td>
                    {/*<a style={actionButtonStyle} href={"/subjects/" + this.props.record.id}>*/}
                    {/*    <i className="far fa-calendar-alt"></i>*/}
                    {/*</a>*/}
                    <a style={actionButtonStyle} onClick={this.togglePresenceModal} title="Obecności">
                        <i className="fa fa-check text-green"></i>
                        {
                            this.props.options ?
                                <SubjectSchedulePresenceModal
                                    key={this.props.record.id}
                                    isOpen={this.state.isPresenceModalOpen}
                                    toggleModal={this.togglePresenceModal}
                                    loadRecords={this.props.loadRecords}
                                    subject={this.props.subject}
                                    record={this.props.record}
                                    options={this.props.options}
                                />
                                : ''
                        }

                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleModalOn} title="Edytuj">
                        <i className="fa fa-edit text-yellow"></i>
                        <SubjectScheduleAddModal
                            key={this.props.record.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            loadRecords={this.props.loadRecords}
                            subject={this.props.subject}
                            record={this.props.record}
                            action={'edit'}
                        />
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń przedmiot">
                        <i className="fa fa-trash text-danger"></i>
                        <SubjectDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            record={this.props.record}
                            loadRecords={this.props.loadRecords}
                            subject={this.props.subject}
                        />
                    </a>

                </td>
            </tr>
        )
    }

}

const actionButtonStyle = {
    cursor: "pointer",
    padding: "0px 5px"
}

export default SubjectSchedule;


