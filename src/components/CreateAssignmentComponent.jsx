import React, { Component } from 'react';
import AssignmentService from '../services/AssignmentService';

class CreateAssignmentComponent extends Component {
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
      employee: '',
      project: '',
      employeeOptions: [],
      projectOptions: [],
      employeeId: '',
      projectId: '',
    };

    this.changeAssignmentTypeHandler = this.changeAssignmentTypeHandler.bind(this);
    this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
    this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
    this.changeBillRateHandler = this.changeBillRateHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeNoteHandler = this.changeNoteHandler.bind(this);
    this.changeEmployeeIdHandler = this.changeEmployeeIdHandler.bind(this);
    this.changeProjectIdHandler = this.changeProjectIdHandler.bind(this);
    this.saveOrUpdateAssignment = this.saveOrUpdateAssignment.bind(this);
  }


  changeEmployeeIdHandler(event) {
    this.setState({ employeeId: event.target.value });
    const selectedEmployeeId = event.target.value;
    const selectedEmployee = this.state.employeeOptions.find(project => project.id === selectedEmployeeId);
    this.setState({ employee: selectedEmployee });
  }


  changeProjectIdHandler(event) {
    this.setState({ projectId: event.target.value });
    const selectedProjectId = event.target.value;
    const selectedProject = this.state.projectOptions.find(project => project.id === selectedProjectId);
    this.setState({ project: selectedProject });
  }
  componentDidMount() {
    this.fetchEmployeeData();
    this.fetchProjectData();

    if (this.state.id === '_add') {
      return;
    } else {
      AssignmentService.getAssignmentById(this.state.assignmentId)
        .then((res) => {
          let assignment = res.data;
          this.setState({
            assignmentType: assignment.assignmentType,
            startDate: assignment.startDate,
            endDate: assignment.endDate,
            billRate: assignment.billRate,
            status: assignment.status,
            note: assignment.note,
            employee: assignment.employee,
            project: assignment.project
          });
        })
        .catch((error) => {
          console.error('Error fetching assignment:', error);
        });
    }

  }
  fetchEmployeeData() {
    fetch('http://localhost:8080/api/v1/employees')
      .then(response => response.json())
      .then(data => {
        this.setState({ employeeOptions: data });
        console.log('Employee data:', data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }


  fetchProjectData() {

    fetch('http://localhost:8080/api/v1/projects')
      .then(response => response.json())
      .then(data => {
        this.setState({ projectOptions: data });
        console.log('Projects data:', data);
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }
  saveOrUpdateAssignment(e) {
    e.preventDefault();
    let assignment = {
      assignmentType: this.state.assignmentType,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      billRate: this.state.billRate,
      status: this.state.status,
      note: this.state.note,
      employee: this.state.employee,
      project: this.state.project
    };

    if (this.state.id === '_add') {
      console.log('final data' + JSON.stringify(assignment));
      AssignmentService.createAssignment(assignment)
        .then(() => {
          this.props.history.push('/assignments');
        })
        .catch((error) => {
          console.error('Error creating assignment:', error);
        });
    } else {
      AssignmentService.updateAssignment(assignment, this.state.assignmentId)
        .then(() => {
          this.props.history.push('/assignments');
        })
        .catch((error) => {
          console.error('Error updating assignment:', error);
        });
    }
  }

  changeAssignmentTypeHandler(event) {
    this.setState({ assignmentType: event.target.value });
  }

  changeStartDateHandler(event) {
    this.setState({ startDate: event.target.value });
  }

  changeEndDateHandler(event) {
    this.setState({ endDate: event.target.value });
  }

  changeBillRateHandler(event) {
    this.setState({ billRate: event.target.value });
  }

  changeStatusHandler(event) {
    this.setState({ status: event.target.value });
  }

  changeNoteHandler(event) {
    this.setState({ note: event.target.value });
  }

  cancel() {
    this.props.history.push('/assignments');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Assignment</h3>;
    } else {
      return <h3 className="text-center">Update Assignment</h3>;
    }
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
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
                  <div className="form-group">
                    <label>Employee ID:</label>
                    <select
                      name="employeeId"
                      className="form-control"
                      value={this.state.employeeId}
                      onChange={this.changeEmployeeIdHandler}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                      <option value="">Select Employee</option>
                      {this.state.employeeOptions.map(employee => (
                        <option key={employee.id} value={employee.id}>
                          {employee.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Project ID:</label>
                    <select
                      name="projectId"
                      className="form-control"
                      value={this.state.projectId}
                      onChange={this.changeProjectIdHandler}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                      <option value="">Select Project</option>
                      {this.state.projectOptions.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-success" onClick={this.saveOrUpdateAssignment}>
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={() => this.cancel()} style={{ marginLeft: '10px' }}>
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

export default CreateAssignmentComponent;
