import React from 'react';
import GroupSubjectDeleteModal from "./GroupSubjectDeleteModal";
import GroupSubjectsAddModal from "./GroupSubjectsAddModal";


export class GroupSubject extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
    };

    toggleModal = (e) => {
        this.setState({
            // isModalOpen: !this.state.isModalOpen
            isModalOpen: !this.state.isModalOpen
        })
    };

    toggleModalOn = (e) => {
        if(this.state.isModalOpen) {
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

    render() {

        return (
            <tr id={this.props.record.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.props.record.name}</td>
                <td>{this.props.record.hours}</td>
                <td>{this.props.record.type}</td>
                <td>
                    {this.props.record.teachers.map((teacher) => {
                        return <div>{teacher.firstName} {teacher.lastName}</div>;
                        // return <div><span>{teacher.email}</span></div>;
                    })}
                </td>

                <td className="row">
                    <a style={actionButtonStyle} href={"/subjects/" + this.props.record.id}>
                        <i className="far fa-calendar-alt"></i>
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleModalOn} title="Edytuj przedmiot">
                        <i className="fa fa-edit text-yellow"></i>
                        <GroupSubjectsAddModal
                            loadRecords={this.props.loadRecords}
                            key={this.props.record.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            record={this.props.record}
                            group={this.props.group}
                            action={"edit"}
                            options={this.props.options}
                        />
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń przedmiot">
                        <i className="fa fa-trash text-danger"></i>
                        <GroupSubjectDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            record={this.props.record}
                            loadRecords={this.props.loadRecords}
                            group={this.props.group}
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

export default GroupSubject;


