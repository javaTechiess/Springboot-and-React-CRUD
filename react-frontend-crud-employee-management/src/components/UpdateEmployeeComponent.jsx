import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class UpdateEmployeeComponent extends Component {
    constructor(props) {
        // Pass props to the super class.
        super(props)

        this.state = {
            // Declare Id, so that it can be used on the route.
            // Id can be rerieved found from the props.
            id: this.props.match.params.id,
            // Define properties to state, to store inputs from data, will enable to get form data that will be available in submission
           // id: '',
            name: '',
            role: ''
        }

        // Bind Handler to component.
        this.changeidHandler = this.changeidHandler.bind(this);

        // Bind Handler to component.
        this.changenameHandler = this.changenameHandler.bind(this);

        // Bind Handler to component.
        this.updateEmployee = this.updateEmployee.bind(this);

    }
    
    // Creating the First Name Handler method to be called.
    changeidHandler=(event) => {
        // Capturing the Event.
        // setState is used to add value to the id, and the value can now be seen in input text field.
        this.setState({id: event.target.value});
    }

    // Creating the Last Name Handler method to be called.
    changenameHandler=(event) => {
        this.setState({name: event.target.value});
    }

    // Creating the Last Name Handler method to be called.
    changeEmailHandler=(event) => {
        this.setState({role: event.target.value});
    }

    componentDidMount() {
        // We have to get the decalred id in the constructor, to be used in the route.
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            // save the response data in a separate variable employee.
            let employee = res.data;
            // set response data to state.
            this.setState({
                id: employee.id,
                name: employee.name,
                role: employee.role
            });
        });
    }

    // Update Employee Method
    updateEmployee = (e) => {
        e.preventDefault();
        

        // Retrieve data from state defined fields.
        // Populates the selected empoloyee details to the field for editing.
        let employee = {id: this.state.id, name: this.state.name, role: this.state.role};
        console.log('mansi => ' + JSON.stringify(e));

        // Adding Console Log to see the updated form data in the console
        console.log('employee3 => ' + JSON.stringify(employee));

        // The employee variable has all the updated values.
        // Call the service to update the employee.
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
           // Once the update request is completed, navigate to employee list page.
           this.props.history.push('/employees');
        })
    }

    // Cancel Method. Navigates Back to the Employee List Component.
    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 ">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className = "form-group">
                                         <label>First Name: </label>
                                         <input placeholder="First Name" name="id" className="form-control"
                                         //  First name Empty at start, then value will be extracted from the text field.
                                         value={this.state.id} onChange={this.changeidHandler} />
                                    </div>

                                    <div className = "form-group">
                                         <label>Last Name: </label>
                                         <input placeholder="Last Name" name="name" className="form-control"
                                         //  First name Empty at start, then value will be extracted from the text field.
                                         value={this.state.name} onChange={this.changenameHandler} />
                                    </div>

                                    <div className = "form-group">
                                         <label>Email Id: </label>
                                         <input placeholder="Email Address" name="role" className="form-control"
                                         //  First name Empty at start, then value will be extracted from the text field.
                                         value={this.state.role} onChange={this.changeEmailHandler} />
                                    </div>

                                    {/* updateEmployee event Handler will be bound in the constructor */}
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>

                                    {/* Cancel Method Bind Directly */}
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

