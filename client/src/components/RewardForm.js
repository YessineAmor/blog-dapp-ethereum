import React, { Component } from 'react'

class RewardForm extends Component {
    constructor(props) {
        super(props);
        this.state = { rewardAmount: 0 };
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log("You are rewarding " + this.state.rewardAmount);
    }
    myChangeHandler = (event) => {
        this.setState({ rewardAmount: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <input
                    type='number'
                    onChange={this.myChangeHandler}
                />
                <input value="Reward (eth)"
                    type='submit'
                />
            </form>
        );
    }
}

export default RewardForm;