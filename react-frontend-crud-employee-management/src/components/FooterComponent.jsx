import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        // Pass props to the super class.
        super(props)

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">All Rights Reserved 2021 @www.JosephMbuku.com</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;