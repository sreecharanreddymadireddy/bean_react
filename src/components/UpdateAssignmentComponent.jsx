import React, { Component } from 'react';
import AssignmentService from '../services/AssignmentService';

class UpdateAssignmentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            assignmentType: '',
            startDate: '',
            endDate: '',
            billRate: '',
            status: '',
            note: '',
        };
       
        this.changeAssignmentTypeHandler = this.changeAssignmentTypeHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changeBillRateHandler = this.changeBillRateHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeNoteHandler = this.changeNoteHandler.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
    }

    componentDidMount() {
        console.log('Fetched id:', this.state.id);
        AssignmentService.getAssignmentById(this.state.id)
            .then((res) => {
                let assignment = res.data;
                console.log('Fetched assignment data:', assignment); // Log the assignment data
                this.setState({
                    assignmentType: assignment.assignmentType,
                    startDate: assignment.startDate,
                    endDate: assignment.endDate,
                    billRate: assignment.billRate,
                    status: assignment.status,
                    note: assignment.note
                });
            })
            .catch((error) => {
                console.error('Error fetching assignment data:', error);
            });
    }


    updateAssignment = (e) => {
        e.preventDefault();
        let assignment = {
            assignmentType: this.state.assignmentType,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            billRate: this.state.billRate,
            status: this.state.status,
            note: this.state.note,
        };
        AssignmentService.updateAssignment(assignment, this.state.id).then((res) => {
            this.props.history.push('/assignments');
        });
    };
    

    changeAssignmentTypeHandler = (event) => {
        this.setState({ assignmentType: event.target.value });
    };

    changeStartDateHandler = (event) => {
        this.setState({ startDate: event.target.value });
    };

    changeEndDateHandler = (event) => {
        this.setState({ endDate: event.target.value });
    };

    changeBillRateHandler = (event) => {
        this.setState({ billRate: event.target.value });
    };

    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    };

    changeNoteHandler = (event) => {
        this.setState({ note: event.target.value });
    };

    cancel() {
        this.props.history.push('/assignments');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Assignment</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Assignment Type:</label>
                                        <input
                                            placeholder="Assignment Type"
                                            name="assignmentType"
                                            className="form-control"
                                            value={this.state.assignmentType}
                                            onChange={this.changeAssignmentTypeHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date:</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            className="form-control"
                                            value={this.state.startDate}
                                            onChange={this.changeStartDateHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date:</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            className="form-control"
                                            value={this.state.endDate}
                                            onChange={this.changeEndDateHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bill Rate:</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="billRate"
                                            className="form-control"
                                            value={this.state.billRate}
                                            onChange={this.changeBillRateHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <input
                                            placeholder="Status"
                                            name="status"
                                            className="form-control"
                                            value={this.state.status}
                                            onChange={this.changeStatusHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Note:</label>
                                        <input
                                            placeholder="Note"
                                            name="note"
                                            className="form-control"
                                            value={this.state.note}
                                            onChange={this.changeNoteHandler}
                                        />
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateAssignment}>
                                        Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: '10px' }}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateAssignmentComponent;
