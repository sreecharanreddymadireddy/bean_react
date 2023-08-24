import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            employeeType: '',
            employmentStatus: '',
            visa: '',
            dob: '',
            vendor: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            reffredby: '',
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeEmployeeTypeHandler = this.changeEmployeeTypeHandler.bind(this);
        this.changeEmploymentStatusHandler = this.changeEmploymentStatusHandler.bind(this);
        this.changeVisaHandler = this.changeVisaHandler.bind(this);
        this.changeDOBTypeHandler = this.changeDOBTypeHandler.bind(this);
        this.changeVendorTypeHandler = this.changeVendorTypeHandler.bind(this);
        this.changePhoneTypeHandler = this.changePhoneTypeHandler.bind(this);

        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeReffredByHandler = this.changeReffredByHandler.bind(this);

    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            employeeType: this.state.employeeType,
            employmentStatus: this.state.employmentStatus,
            visa: this.state.visa,
            dob: this.state.dob,
            vendor: this.state.vendor,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            referredBy: this.state.referredBy,
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }
    changeEmployeeTypeHandler = (event) => {
        this.setState({ employeeType: event.target.value });
    }

    changeEmploymentStatusHandler = (event) => {
        this.setState({ employmentStatus: event.target.value });
    }

    changeVisaHandler = (event) => {
        this.setState({ visa: event.target.value });
    }
    changeDOBTypeHandler = (event) => {
        this.setState({ dob: event.target.value });
    }
    changeVendorTypeHandler = (event) => {
        this.setState({ vendor: event.target.value });
    }
    changePhoneTypeHandler = (event) => {
        this.setState({ phone: event.target.value });
    }
    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }
    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }
    changeStateHandler = (event) => {
        this.setState({ state: event.target.value });
    }
    changeReffredByHandler = (event) => {
        this.setState({ reffredby: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 overflow-y:auto">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="input-group" >
                                        <label > First Name :  </label> <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Type: </label>
                                        <input placeholder="Employee Type" name="employeeType" className="form-control"
                                            value={this.state.employeeType} onChange={this.changeEmployeeTypeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Status: </label>
                                        <input placeholder="Employment Status" name="employmentStatus" className="form-control"
                                            value={this.state.employmentStatus} onChange={this.changeEmploymentStatusHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Visa Status: </label>
                                        <input placeholder="Visa" name="visa" className="form-control"
                                            value={this.state.visa} onChange={this.changeVisaHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Vendor Name: </label>
                                        <input placeholder="Vendor Name" name="vendor" className="form-control"
                                            value={this.state.vendor} onChange={this.changeVendorTypeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date Of Birth Status: </label>
                                        <input placeholder="Employment Status" name="employmentStatus" className="form-control"
                                            value={this.state.dob} onChange={this.changeDOBTypeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Phone Number : </label>
                                        <input placeholder="xxx-xxx-xxxx" name="phone" className="form-control"
                                            value={this.state.phone} onChange={this.changePhoneTypeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Address: </label>
                                        <input placeholder="Address" name="address" className="form-control"
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> City: </label>
                                        <input placeholder="City" name="city" className="form-control"
                                            value={this.state.city} onChange={this.changeCityHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> State : </label>
                                        <input placeholder="State" name="state" className="form-control"
                                            value={this.state.state} onChange={this.changeStateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> ReffredBy : </label>
                                        <input placeholder="State" name="state" className="form-control"
                                            value={this.state.reffredby} onChange={this.changeReffredByHandler} />
                                    </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
