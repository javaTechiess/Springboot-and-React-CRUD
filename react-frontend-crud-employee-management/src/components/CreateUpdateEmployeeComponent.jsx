import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateUpdateEmployeeComponent extends Component {
    constructor(props) {
        // Pass props to the super class.
        super(props)

        this.state = {
            // Id can be rerieved found from the props, 
            // (The retrieved id can be used  to write the logic of whether the operation is add or update).
            // Step 2 : Re-using create component to update.
            id: this.props.match.params.id,
            // Define properties to state, to store inputs from data, will enable to get form data that will be available in submission
            id: '',
            name: '',
            role: ''
        }

        // Bind Handler to component.
        //this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);

        // Bind Handler to component.
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);

        // Bind Handler to component.
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);

    }

    // Step 3 : Re-using create component to update.
    componentDidMount() {
        // Step 4 : Re-using create component to update.
        // Add a condition using the id, to determine whether the method is add or update function.
        // -1 will be true for adding employee, because when updating an employee, 
        // the id retrieved will always be a positive integer that the database generated.
        // instead of -1, we can also use _add (When using an integer value like -1, use == Operater, When using a string like '_add', use === Operater. ).

        if (this.state.id === '_add') {
            // Don't fetch our employee object by id. We simply return it.
            return
        }else{
            // Here the id will always be positive, and will be used for update functionality.
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
    }
    
    // Creating the First Name Handler method to be called.
    // changeFirstNameHandler=(event) => {
    //     // Capturing the Event.
    //     // setState is used to add value to the firstName, and the value can now be seen in input text field.
    //     this.setState({id: event.target.value});
    // }

    // Creating the Last Name Handler method to be called.
    changeLastNameHandler=(event) => {
        this.setState({name: event.target.value});
    }

    // Creating the Last Name Handler method to be called.
    changeEmailHandler=(event) => {
        this.setState({role: event.target.value});
    }

    // Save Employee Method
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        // Retrieve data from state defined fields.
        let employee = { name: this.state.name, role: this.state.role};

        // Adding Console Log to see the form data in the console
        //console.log('employee1 => ' + JSON.stringify(employee));


        // Step 5 : Re-using create component to update.
        // Determining whether to create or update employee, on clicking the save button.
        if(this.state.id === '_add'){
            
            // Call create Service method and pass employee object.
            // Axios returns a promise. We call the then method.
            EmployeeService.createEmployees(employee).then(res => {
                // Navigate to the Employee List, once Saved.
                this.props.history.push('/employees');
                alert("Employee Created Successfully");
            });
        }else {
            // The employee variable has all the updated values.
            // Call the service to update the employee.
            EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
                // Once the update request is completed, navigate to employee list page.
                this.props.history.push('/employees');
            })
        }
    }

    // Cancel Method. Navigates Back to the Employee List Component.
    cancel(){
        this.props.history.push('/employees');
    }

    // Step 7 : Re-using create component to update.
    // Determine Title based on whether update or add condition is satisfied.
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
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 ">
                            {/* This is JSX, therefore can write JS code between html structure. */}
                            {/* Calling the getTitle method to display the title. */}
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    

                                    <div className = "form-group">
                                         <label>Name: </label>
                                         <input placeholder="Name" name="Name" className="form-control"
                                         //  First name Empty at start, then value will be extracted from the text field.
                                         value={this.state.name} onChange={this.changeLastNameHandler} />
                                    </div>

                                    <div className = "form-group">
                                         <label>Role: </label>
                                         <input placeholder="role" name="role" className="form-control"
                                         //  First name Empty at start, then value will be extracted from the text field.
                                         value={this.state.role} onChange={this.changeEmailHandler} />
                                    </div>

                                    {/* saveOrUpdateEmployee event Handler will be bind in the constructor */}
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>

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

export default CreateUpdateEmployeeComponent;