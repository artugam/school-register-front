import React from 'react';
import PropTypes from "prop-types";

export class SortTableHeader extends React.Component {

    sortDirection = {
        DESC : "DESC",
        ASC : "ASC"
    };

    state = {
        direction: this.sortDirection.ASC
    };

    handleSort = () => {
        if(!this.props.field) {
            return;
        }
        var direction = this.sortDirection.DESC;
        if(this.state.direction == this.sortDirection.DESC) {
            direction = this.sortDirection.ASC;
        }

        this.setState({direction: direction});
        this.props.handleSort(this.props.field, direction);
    };

    getSortIcon = () => {
        if(!this.props.field) {
            return '';
        }
        return (
            <i className="fa fa-arrows-alt-v"></i>
        );
    };

    render() {
        return (
            <th style={this.sortButtonStyle} onClick={this.handleSort} scope="col">{this.props.text} {this.getSortIcon()}</th>
        )
    }

    sortButtonStyle = {
        cursor: this.props.field ? "pointer" : "default ",
    };

}


SortTableHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default SortTableHeader;


