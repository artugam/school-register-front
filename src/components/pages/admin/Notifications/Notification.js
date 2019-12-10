import React from 'react';
import Moment from "react-moment";
import NotificationDeleteModal from "./NotificationDeleteModal";
import {NotificationModal} from "./NotificationModal";

export class Notification extends React.Component {
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
                <td scope="row">{this.props.record.description}</td>
                <td>{this.props.record.course ?
                    <span>
                        {this.props.record.course.name}&nbsp;
                        <Moment format="MM-YYYY">
                            {this.props.record.course.startDate}
                        </Moment>
                    </span>

                    : "-"}</td>
                <td>{this.props.record.group ? this.props.record.group.name : "-"}</td>
                <td>{this.props.record.subject ? this.props.record.subject.name : "-"}</td>
                {/*<td>{this.props.record.lastName}</td>*/}
                {/*<td>{this.props.record.email}</td>*/}
                {/*<td>{this.props.record.currentSemester}</td>*/}
                <td>
                    {/*<a style={actionButtonStyle} href={"/groups/" + this.props.record.id + "/subjects/"} title="Przedmioty">*/}
                    {/*    <i className="fa fa-book text-green"></i>*/}
                    {/*</a>*/}
                    {/*<a style={actionButtonStyle} href={"/groups/" + this.props.record.id} title={"Studenci"}>*/}
                    {/*    <i className="fa fa-users text-blue"></i>*/}
                    {/*</a>*/}
                    <a style={actionButtonStyle} onClick={this.toggleModal} title="Edytuj grupę">
                        <i className="fa fa-edit text-yellow"></i>
                        <NotificationModal
                            isOpen={this.state.isModalOpen}
                            toggleModal={this.toggleModal}
                            loadRecords={this.props.loadRecords}
                            courses={this.props.courses}
                            record={this.props.record}
                            action={'edit'}
                        />
                    </a>
                    <a style={actionButtonStyle} onClick={this.toggleDeleteModal} title="Usuń powiadomienie">
                        <i className="fa fa-trash text-danger"></i>
                        <NotificationDeleteModal
                            key={this.props.record.id}
                            isOpen={this.state.isDeleteModalOpen}
                            toggleModal={this.toggleDeleteModal}
                            loadRecords={this.props.loadRecords}
                            record={this.props.record}
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

export default Notification;


