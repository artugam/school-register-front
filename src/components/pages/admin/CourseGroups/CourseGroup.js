import React from 'react';
import CourseGroupDeleteModal from "./CourseGroupDeleteModal";
import CourseGroupAddModal from "./CourseGroupAddModal";



export class CourseGroup extends React.Component {
    state = {
        isModalOpen: false,
        isDeleteModalOpen: false,
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

    render() {

        return (
            <tr id={this.props.record.id} style={{"borderBottom": "2px solid #adb5bd"}}>
                <td scope="row">{this.props.record.name}</td>
                <td>{this.props.record.users.length}</td>
                {/*<td>{this.props.record.lastName}</td>*/}
                {/*<td>{this.props.record.email}</td>*/}
                {/*<td>{this.props.record.currentSemester}</td>*/}
                <td>
                    <a style={actionButtonStyle} href={"/groups/" + this.props.record.id + "/subjects/"} title="Przedmioty">
                        <i className="fa fa-book text-green"></i>
                    </a>
                    <a style={actionButtonStyle} href={"/groups/" + this.props.record.id} title={"Studenci"}>
                        <i className="fa fa-users text-blue"></i>
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleModal} title="Edytuj grupę">
                        <i className="fa fa-edit text-yellow"></i>
                        <CourseGroupAddModal
                            key={this.props.record.id}
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            loadRecords={this.props.loadRecords}
                            record={this.props.record}
                            course={this.props.course}
                            action={"edit"}
                        />
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń grupę">
                        <i className="fa fa-trash text-danger"></i>
                        <CourseGroupDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            loadRecords={this.props.loadRecords}
                            record={this.props.record}
                            course={this.props.course}
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

export default CourseGroup;


