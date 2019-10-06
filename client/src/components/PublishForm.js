import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils';

class PublishForm extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", content: "" }
    }
    mySubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const title = this.state.title
            const content = this.state.content
            console.log("props", this.props.vars.web3)
            const web3 = this.props.vars.web3
            const accounts = this.props.vars.accounts
            const contract = this.props.vars.contract
            blogUtils.publishSubmission(title, content, 0, web3, accounts[0], contract)
        } catch (error) {
            console.log(error)
        }
    }
    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <input placeholder="Title"
                    type='text' name="title"
                    onChange={this.myChangeHandler}
                />
                <input placeholder="Content" name="content" type="text" onChange={this.myChangeHandler} />
                <input value="Publish"
                    type='submit'
                />
            </form>
        );
    }
}

export default PublishForm;