import React from 'react';

export class TablePageSelect extends React.Component {

    handleChange = (e) => {
        if (!this.props.onChange) {
            return;
        }
        this.props.onChange(parseInt(e.target.value));

    };

    render() {
        return (
            <select onChange={this.handleChange}>
                {this.props.items.map((value, index) => {
                    return <option key={index} value={value}>{value}</option>
                })}
            </select>
        )
    }
}

export default TablePageSelect;


