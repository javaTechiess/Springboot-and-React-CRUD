import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';

// There are 2 types of components in React: Stateful and Stateless. 
// This Learning Series will be using React Classes.
class ListEmployeeComponent extends Component {
    constructor(props) {
        // Pass props to the super class.
        super(props)

        this.state = {
            // Initialize an employee array inside a state.
            employees: []
        }

        // Event Handler Binded in Constructor when button is pressed.
        this.addEmployee = this.addEmployee.bind(this);

        // Bind then edit employee Method to the component.
        this.editEmployee = this.editEmployee.bind(this);

        // Bind the delete employee Method to the component.
        this.deleteEmployee = this.deleteEmployee.bind(this); 

    }

    // Called immediately a component is mounted. Used to make rest/ajax API methods
    componentDidMount(){
        // getEmployees returns a promise, with a 'then' method that has a response.
        EmployeeService.getEmployees().then((res) => {
            // Store the response data into the employees array.
            this.setState({employees: res.data});
        });
    }

    // Add Employee Method
    addEmployee(){
        // When Employee Button is clicked, this route gets called. The path leads to createEmployee Component.
        // React Router configured in App.js stores history objects.
        // And history has all the mappings of the routings.
        // React router passes history objects to each router as props.
        // React router basically provides history objects, for each route to props.
        // We get the history objects from props. 
        // The history object enables us to manually controll the history of the browser.
        this.props.history.push('/add-employee/_add');
    }

    // Edit Employee Method
    // Should have the method argument id,  because we are passing id on click of the button.
    editEmployee(id){
        // Syntax to pass id to the path url dynamically. (Remember to use back-stick instead of single quotes).
        // this.props.history.push(`/update-employee/${id}`);

        // Step 6 : Re-using create component to update.
        this.props.history.push(`/add-employee/${id}`);
    }

    // Delete Employee Event Handler.
    deleteEmployee(id) {
        // Delete Rest api call 
        EmployeeService.deleteEmployee(id).then((res) => {
            // Remove that deleted employee from the employee list.
            // Filter a deleted employee from the employee array, instead of making an api call, for perfomance improvement.
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })

    }

    // View Employee event Handler
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`)
    }

    render() {
        // Write Jsx Code inside the Return method.
        return (
            <div>
                {/* In react we use 'className' to point to css/bootsrap classes unlike html where we use the 'class' variable. */}
                <h2 className="text-center">Employee List</h2>

                <div className="row">
                    <div className="mb-2">
                        {/* Employee Button */}
                        <Button onClick={this.addEmployee} variant="primary">Add Employee</Button>
                    </div>
                    {/* Bootstrap table */}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Employee Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* Inside Table Body, We have a javasript code to dynamically display table rows */}
                        <tbody>
                            {
                                // Map is an es6 feature we are going to leverage.
                                this.state.employees.map(
                                    // Here we Iterate over the Employees.
                                    employee => 
                                    // Each Row Will have a Unique Id.
                                    <tr key={employee.id}>
                                        {/* Populate the Row with Data from the Database. */}
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.role}</td>
                                        <td>
                                            {/* Whenever we want to use id, use arrow function. */}
                                            {/* Onclick navigates to the edit Employee page.*/}
                                            <Button onClick= {() => this.editEmployee(employee.id)} variant="warning">Update</Button>
                                            
                                            {/* OnClick deletes that particular record. */}
                                            <Button style={{marginLeft: "10px"}} onClick= {() => this.deleteEmployee(employee.id)} variant="danger">Delete</Button>

                                            {/*Button to navigate to the view employee page.  */}
                                            <Button style={{marginLeft: "10px"}} onClick= {() => this.viewEmployee(employee.id)} variant="info">View</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        );
    }
}

export default ListEmployeeComponent;