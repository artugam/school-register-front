import React from 'react';
import Moment from "react-moment";

export class SubjectScheduleInfo extends React.Component {

    render() {
        return (
            <div className="card shadow">

                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">

                            <h2 className="d-inline mb-0 p-2 font-weight-500">
                                Kierunek:
                            </h2>

                            <h2 className="d-inline text-gray-dark font-weight-900">{this.props.subject.group.course.name} - <Moment
                                format="MM-YYYY">{this.props.subject.group.course.startDate}</Moment></h2>
                        </div>
                    </div>
                    <div className="col">
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Grupa</h3>
                            </div>
                            <div className="col-sm-6">
                                <h3>{this.props.subject.group.name}</h3>
                            </div>
                        </div>
                        <div className="row tab-pane">
                            <div className="col-sm-6">
                                <h3>Starosta</h3>
                            </div>
                            <div className="col-sm-6">
                                {this.props.subject.group.course.foreman ?
                                    <h3>{this.props.subject.group.course.foreman.firstName} {this.props.subject.group.course.foreman.lastName} ({this.props.subject.group.course.foreman.email})</h3>
                                    : '-'
                                }
                            </div>
                        </div>

                    </div>


                </div>


            </div>


        )
    }
}

export default SubjectScheduleInfo;


