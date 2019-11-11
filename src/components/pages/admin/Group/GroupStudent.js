import React from 'react';
import GroupStudentDeleteModal from "./GroupStudentDeleteModal";


export class GroupStudent extends React.Component {
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
                <td scope="row">{this.props.record.firstName}</td>
                <td>{this.props.record.lastName}</td>
                <td>{this.props.record.email}</td>
                {/*<td>{this.props.record.currentSemester}</td>*/}
                <td className="row">
                    {/*<a style={actionButtonStyle} href={"/courses/" + this.props.record.id}>*/}
                    {/*    <i className="fa fa-info-circle text-blue"></i>*/}
                    {/*</a>*/}
                    {/*<a style={actionButtonStyle} onClick={this.toggleModal} title="Mianuj starostą">*/}
                    {/*    <i className="fa fa-user-alt text-primary"></i>*/}
                    {/*    <CourseForemanModal*/}
                    {/*        loadRecords={this.props.loadRecords}*/}
                    {/*        key={this.props.record.id}*/}
                    {/*        isOpen={this.state.isModalOpen}*/}
                    {/*        toggleModal={this.toggleModal}*/}
                    {/*        record={this.props.record}*/}
                    {/*        course={this.props.course}*/}
                    {/*    />*/}
                    {/*</a>*/}
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń z grupy">
                        <i className="fa fa-trash text-danger"></i>
                        <GroupStudentDeleteModal
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
    // display: "block",
    padding: "0px 5px"
}

export default GroupStudent;


