import React from 'react';
import FullGradeEditDescriptionModal from "./FullGradeEditDescriptionModal";
import FullGradeDeleteSection from "./FullGradeDeleteSection";
import userConstants from "../Users/UserConstants";

export class FullGradeTableHeader extends React.Component {

    state = {
        isModalOpen: false,
        isDeleteModalOpen: false
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
            <th scope="col" key={this.props.description + Math.random()}>
                <div className="d-inline" style={{width: "300px"}}>
                    <span style={this.sortButtonStyle} onClick={this.toggleModal}>
                     {this.props.description ? this.props.description : '-'}
                    </span>
                    {
                        this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                            <span style={this.sortButtonStyle} onClick={this.toggleDeleteModal} className="close" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </span>
                            : ''
                    }

                </div>

                {
                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                        <FullGradeEditDescriptionModal
                            key={this.props.description + Math.random()}
                            isOpen={this.state.isModalOpen}
                            subject={this.props.subject}
                            toggleModal={this.toggleModal}
                            loadRecords={this.props.loadRecords}
                            description={this.props.description}
                        />
                        : ''
                }
                {
                    this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ?
                        <FullGradeDeleteSection
                            key={this.props.description + Math.random()}
                            isOpen={this.state.isDeleteModalOpen}
                            subject={this.props.subject}
                            toggleModal={this.toggleDeleteModal}
                            loadRecords={this.props.loadRecords}
                            description={this.props.description}
                        />
                        : ''
                }


            </th>

        )
    }

    sortButtonStyle = {
        cursor: this.props.roles.includes(userConstants.roles.ROLE_TEACHER) ? "pointer" : 'default',
    };

}

export default FullGradeTableHeader;


