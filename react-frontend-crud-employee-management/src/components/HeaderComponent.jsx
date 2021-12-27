import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        // Pass props to the super class.
        super(props)

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand">Employee Management System</a></div> 
                    </nav>
                </header> 
            </div>
        );
    }
}

export default HeaderComponent;