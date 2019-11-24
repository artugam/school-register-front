import React from 'react';

export class ProfileSubject extends React.Component {
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
                    <a style={actionButtonStyle} href={"/subjects/" + this.props.record.id + "/schedule"} title="Dziennik">
                        <i className="far fa-calendar-alt"></i>
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

export default ProfileSubject;


