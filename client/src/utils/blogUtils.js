import getWeb3 from "./getWeb3"
import BlogContract from "../contracts/Blog.json";

const blogUtils = class {

    static async getVars() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = BlogContract.networks[networkId];
            const instance = new web3.eth.Contract(
                BlogContract.abi,
                deployedNetwork && deployedNetwork.address
            );
            return [web3, accounts, networkId, deployedNetwork, instance]
        } catch (error) {
            console.log(error)
        }
    }

    static async publishSubmission(title, content, parentID, web3, account, contract) {
        await contract.methods.publishSubmission(title, content, parentID).send({ from: account, value: web3.utils.toWei("0.05", "ether") });
    }

    static async rewardSubmission(submissionID, amount, web3, account, contract) {
        await contract.methods.rewardSubmission(submissionID).send({ from: account, value: web3.utils.toWei(amount, "ether") })
    }

    static async test() {
        return this.getVars()
    }
}
export default blogUtils;