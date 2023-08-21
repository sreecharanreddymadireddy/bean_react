import React, { Component } from 'react';
import ProjectService from '../services/ProjectService';

class CreateProjectComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
            vendor: '',
            client: '',
            billRate: '',
            startDate: '',
            endDate: '',
            status: '',
            invoiceTerm: '',
            paymentTerm: '',
            notes: '',
        };

        this.changeProjectNameHandler = this.changeProjectNameHandler.bind(this);
        this.changeVendorHandler = this.changeVendorHandler.bind(this);
        this.changeClientHandler = this.changeClientHandler.bind(this);
        this.changeBillRateHandler = this.changeBillRateHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeInvoiceTermHandler = this.changeInvoiceTermHandler.bind(this);
        this.changePaymentTermHandler = this.changePaymentTermHandler.bind(this);
        this.changeNotesHandler = this.changeNotesHandler.bind(this);
        this.saveOrUpdateProject = this.saveOrUpdateProject.bind(this);
    }

    saveOrUpdateProject(e) {
        e.preventDefault();
        const project = {
            projectName: this.state.projectName,
            vendor: this.state.vendor,
            client: this.state.client,
            billRate: this.state.billRate,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: this.state.status,
            invoiceTerm: this.state.invoiceTerm,
            paymentTerm: this.state.paymentTerm,
            notes: this.state.notes,
        };

        if (this.state.id === '_add') {
            ProjectService.createProject(project)
                .then(() => {
                    this.props.history.push('/projects');
                })
                .catch(error => {
                    console.error('Error creating project:', error);
                });
        } else {
            ProjectService.updateProject(project, this.state.id)
                .then(() => {
                    this.props.history.push('/projects');
                })
                .catch(error => {
                    console.error('Error updating project:', error);
                });
        }
    }

    changeProjectNameHandler(event) {
        this.setState({ projectName: event.target.value });
    }

    changeVendorHandler(event) {
        this.setState({ vendor: event.target.value });
    }

    changeClientHandler(event) {
        this.setState({ client: event.target.value });
    }

    changeBillRateHandler(event) {
        this.setState({ billRate: event.target.value });
    }

    changeStartDateHandler(event) {
        this.setState({ startDate: event.target.value });
    }

    changeEndDateHandler(event) {
        this.setState({ endDate: event.target.value });
    }

    changeStatusHandler(event) {
        this.setState({ status: event.target.value });
    }

    changeInvoiceTermHandler(event) {
        this.setState({ invoiceTerm: event.target.value });
    }

    changePaymentTermHandler(event) {
        this.setState({ paymentTerm: event.target.value });
    }

    changeNotesHandler(event) {
        this.setState({ notes: event.target.value });
    }

    cancel() {
        this.props.history.push('/projects');
    }

    getTitle() {
        return this.state.id === '_add' ? <h3 className="text-center">Add Project</h3> : <h3 className="text-center">Update Project</h3>;
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 overflow-y:auto">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Project Name:</label>
                                        <input
                                            placeholder="Project Name"
                                            name="projectName"
                                            className="form-control"
                                            value={this.state.projectName}
                                            onChange={this.changeProjectNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Vendor:</label>
                                        <input
                                            placeholder="Vendor"
                                            name="vendor"
                                            className="form-control"
                                            value={this.state.vendor}
                                            onChange={this.changeVendorHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client:</label>
                                        <input
                                            placeholder="Client"
                                            name="client"
                                            className="form-control"
                                            value={this.state.client}
                                            onChange={this.changeClientHandler}
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
                                        <label>Invoice Term:</label>
                                        <input
                                            placeholder="Invoice Term"
                                            name="invoiceTerm"
                                            className="form-control"
                                            value={this.state.invoiceTerm}
                                            onChange={this.changeInvoiceTermHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Payment Term:</label>
                                        <input
                                            placeholder="Payment Term"
                                            name="paymentTerm"
                                            className="form-control"
                                            value={this.state.paymentTerm}
                                            onChange={this.changePaymentTermHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Notes:</label>
                                        <input
                                            placeholder="Notes"
                                            name="notes"
                                            className="form-control"
                                            value={this.state.notes}
                                            onChange={this.changeNotesHandler}
                                        />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateProject}>
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

export default CreateProjectComponent;
