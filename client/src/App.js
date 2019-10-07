import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3"

import "./App.css";
import Submissions from "./components/Submissions.js";
import PublishForm from "./components/PublishForm.js";
import Navbar from "./components/Navbar";
import blogUtils from "./utils/blogUtils";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tab: "Home", web3: null };

    }

    componentDidMount = async () => {
        document.title = "Greatest Blog!";
        this.setState({ web3: blogUtils.web3 });
    }

    buttonClicked = (event) => {
        switch (event.target.name) {
            case "Home":
                this.setState({ tab: "Home" });
                break;
            case "Write":
                this.setState({ tab: "Write" });
                break;
            case "Rewards":
                this.setState({ tab: "Rewards" });
                break;
        }
    }

    render() {

        const header = <div> <h1>Greatest Blog Ever</h1>
            <h5>it's not the greatest looking blog but the more important question
        to ask does it have the best content? ... well no but it's something!</h5>
            <h6>Runs on Ropsten network.</h6>
            <Navbar buttonClicked={this.buttonClicked} /></div>
        if (!this.state.web3) {
            return (
                <div className="App">
                    {header}
                    <br></br>
                    <div> Please verify that you have metamask installed and activated </div>;
                </div>
            )
        } else {
            if (this.state.tab == "Home") {
                return (
                    <div className="App">
                        {header}
                        <Submissions />
                    </div>
                );
            } else if (this.state.tab == "Write") {
                return (
                    <div className="App">
                        {header}
                        <PublishForm />
                    </div>
                );
            }
        }
    }
}

export default App;