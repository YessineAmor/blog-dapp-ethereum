import React, { Component } from "react";

import "./App.css";
import Submissions from "./components/Submissions.js";
import PublishForm from "./components/PublishForm.js";
import blogUtils from "./utils/blogUtils.js";

class App extends Component {
    state = { web3: null, accounts: null, contract: null };
    componentDidMount = async () => {
        const vals = await blogUtils.getVars()
        const web3 = vals[0]
        const accounts = vals[1]
        const contract = vals[4]
        this.setState({ web3: web3, accounts: accounts, contract: contract })

    }
    render() {
        /*  if (!this.state.web3) {
             return <div> Loading Web3, accounts, and contract... </div>;
         } */

        return (
            <div className="App">
                <h1>Greatest Blog Ever</h1>
                <PublishForm vars={this.state} />
                <Submissions vars={this.state} />
            </div>
        );
    }
}

export default App;