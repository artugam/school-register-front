import React from 'react';

export class FullGradeTableHeader extends React.Component {

    render() {
        return (
            <th scope="col">
                {this.props.text}
            </th>

        )
    }

    sortButtonStyle = {
        cursor: "pointer",
        width: "300px"
    };

}

export default FullGradeTableHeader;


