import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils';
import Submissions from './Submissions';
import PublishForm from './PublishForm';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "Home" };
    }


    render() {

        return (
            <div className="topNav">
                <button name="Home" onClick={this.props.buttonClicked} className="active">Home</button>
                <button name="Write" onClick={this.props.buttonClicked}>Write</button>
                <button name="Rewards" onClick={this.props.buttonClicked}>My Rewards</button>
            </div>
        );
    }
}


export default Navbar;