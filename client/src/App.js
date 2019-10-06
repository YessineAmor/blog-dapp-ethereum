import React, { Component } from "react";

import "./App.css";
import Submissions from "./components/Submissions.js";
import PublishForm from "./components/PublishForm.js";
import blogUtils from "./utils/blogUtils.js";

class App extends Component {
    componentDidMount = async () => {
        document.title="Greatest Blog!";
    }
    render() {
        /*  if (!this.state.web3) {
             return <div> Loading Web3, accounts, and contract... </div>;
         } */

        return (
            <div className="App">
                <h1>Greatest Blog Ever</h1>
                <h5>it's not the greatest looking blog but the more important question
                    to ask does it have the best content? ... well no but it's something!</h5>
                <PublishForm />
                <Submissions />
            </div>
        );
    }
}

export default App;