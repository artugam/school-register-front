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
        var direction = this.sortDirection.DESC;
        if(this.state.direction == this.sortDirection.DESC) {
            direction = this.sortDirection.ASC;
        }
        this.setState({direction});
        this.props.handleSort(this.props.field, direction);
    };

    render() {
        return (
            <th style={this.sortButtonStyle} onClick={this.handleSort} scope="col">{this.props.text}</th>
        )
    }

    sortButtonStyle = {
        cursor: "pointer",
    };

}


SortTableHeader.propTypes = {
    field: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handleSort: PropTypes.func.isRequired
};

export default SortTableHeader;


