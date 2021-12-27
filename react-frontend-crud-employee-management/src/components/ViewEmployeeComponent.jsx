import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

// Populate user data.
export default class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // Retrieves the id of the selected user.
            id: this.props.match.params.id,

            // Add Employee Object to the state of the component.
            employee: {}
        }
    }
    componentDidMount(){
        // Call the service to get employee by id.
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            // Extract employee data from the response.
            // Update state of the employee object, with the response data.
            this.setState({employee: res.data});
        }) 
    }
    render() {
        return (
            <div>
                <br/>
                <div className= "card col-md-6 offset-md">
                    <h3 className= "text-center"> View Employee Details</h3>
                    <div className = "row">
                        <div className = "row">
                            <label htmlFor="">Employee Name:</label>
                            <div> { this.state.employee.name } </div>
                        </div>
                        <div className = "row">
                            <label htmlFor="">Employee Role:</label>
                            <div> { this.state.employee.role } </div>
                        </div>
                        <div className = "row">
                            <label htmlFor="">Employee Id:</label>
                            <div> { this.state.employee.id } </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
