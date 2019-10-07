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
            blogUtils.publishSubmission(title, content, 0)
        } catch (error) {
            console.log(error)
        }
    }
    myChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div>
                <h3>Write something here..</h3>
                <form onSubmit={this.mySubmitHandler}>
                    <input placeholder="Title (40 chars max)"
                        type='text' name="title"
                        onChange={this.myChangeHandler} maxLength="40" className="publishing"
                    /><br></br>
                    <textarea className="publishing" placeholder="Talk about whatever you like! Try to keep it civil though (300 chars max)" maxLength="300" name="content" onChange={this.myChangeHandler}></textarea>
                    <br></br>
                    <input value="Publish"
                        type='submit'
                    />
                </form>
            </div>
        );
    }
}

export default PublishForm;