import React, { Component } from 'react'
import _ from "lodash";
import RewardForm from './RewardForm'
import BlogContract from "../contracts/Blog.json";
import getWeb3 from "../utils/getWeb3";
import blogUtils from '../utils/blogUtils';


class Submissions extends Component {
    state = { submissionsCount: 0, web3: null, accounts: null, contract: null, submissions: [] };

    componentDidMount = async () => {
        try {
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.

            const vals = await blogUtils.getVars()
            const web3 = vals[0]
            const accounts = vals[1]
            const instance = vals[4]
            this.setState(
                { web3, accounts, contract: instance },
                this.fetchSubmissions
            );
            // await instance.methods.publishSubmission("content", "title", 0).send({ from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
            this.state.contract.events.SubmissionEvent({}, (err, event) => {
                console.log("EVENT!! Added new submission with ID ", event.returnValues.submissionID)
                this.fetchSubmissions()
            })
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };
    fetchSubmission = async (id) => {
        this.state.contract.methods.getSubmission(id).call().then(res => {
            //console.log("fetch ", res)
            //console.log(this.state.submissions.unshift(res))
            //console.log(this.state.submissions)
            this.setState({ submissions: this.state.submissions })
        })
    }
    fetchSubmissions = async () => {
        const { accounts, contract, web3 } = this.state;
        // await contract.methods.set(5).send({ from: accounts[0] });
        //await contract.methods.publishSubmission("content", "title", 0).send({ from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
        //await contract.methods.publishSubmission("second method", "Second", 0,{ from: accounts[0], value: web3.utils.toWei("0.05", "ether") })
        // Get the value from the contract to prove it worked.
        let submissions = [];
        await contract.methods
            .getSubmissionsLength()
            .call()
            .then(res => {
                this.setState({ submissionsCount: res });
            }).then(async () => {
                if (this.state.submissionsCount != 0) {
                    await contract.methods
                        .getAllSubmissions()
                        .call()
                        .then(res => {
                            submissions = res;
                        });
                    this.setState({ submissions: submissions });
                }
            });
        console.log(this.state.submissions);
        // Update state with the result.
    };

    render() {
        let Submissions = [];

        _.forEachRight(this.state.submissions, (value, index) => {
            let date = new Date(value[3] * 1000)
            Submissions.push(
                <div className="submission" key={index}>
                    <h2> {value[1]} </h2>{" "}
                    <pre>{date.toString()}</pre>
                    <pre>
                        Written by {value[0]}, Rewards:{" "}
                        {value["reward"]} eth{" "}
                    </pre>{" "}
                    <h4> {value[2]} </h4>{" "}
                    <RewardForm />
                </div>
            );
        });
        return (
            <div>
                <h4>There is currently {this.state.submissionsCount} submissions on the blockchain</h4>
                {Submissions}
            </div>
        );
    }
}

export default Submissions;