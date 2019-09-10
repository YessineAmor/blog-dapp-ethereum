import React, { Component } from 'react'
import blogUtils from '../utils/blogUtils';

class RewardForm extends Component {
    constructor(props) {
        super(props);
        this.state = { rewardAmount: 0, account: this.props.vars.accounts[0], contract: this.props.vars.contract, web3: this.props.vars.web3 };
    }

    componentDidMount() {
        this.state.contract.events.RewardSubmission({}, (err, event) => {
            console.log("EVENT!! Rewarded submission with ID ", event.returnValues.submissionID)
        })
    }


    mySubmitHandler = async (event) => {
        event.preventDefault();
        const web3 = this.props.vars.web3
        const accounts = this.props.vars.accounts
        const contract = this.props.vars.contract
        const submissionID = this.props.submissionIndex + 1
        console.log("You " + accounts[0] + " are rewarding " + this.state.rewardAmount + " eth to " + this.props.submissionIndex);
        await blogUtils.rewardSubmission(submissionID, this.state.rewardAmount, web3, accounts[0], contract)
        this.props.fetchSubmissions()
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