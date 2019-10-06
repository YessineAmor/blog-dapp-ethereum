import getWeb3 from "./getWeb3"
import BlogContract from "../contracts/Blog.json";

const blogUtils = class {

    constructor() {
        this.web3=null;
        this.accounts=null;
        this.networkId=null;
        this.instance=null;
    }

    get accounts(){
        return this.accounts;
    }
    get instance(){
        return this.instance;
    }
    get networkId(){
        return this.instance;
    }
    get web3(){
        return this.instance;
    }

    static async getVars() {
        try {
            // Get network provider and this.web3 this.instance.
            this.web3 = await getWeb3();
            // Use this.web3 to get the user's this.accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract this.instance.
             this.networkId = await this.web3.eth.net.getId();
             this.instance = new this.web3.eth.Contract(
                BlogContract.abi,
                '0x55DAeE5db3BCB9b74ddf0fF483322519fcf376b9'
            );
            return [this.web3, this.accounts, this.networkId, this.instance]
        } catch (error) {
            console.log(error)
        }
    }

    static async publishSubmission(title, content, parentID) {
        await this.instance.methods.publishSubmission(title, content, parentID).send({ from: this.accounts[0], value: this.web3.utils.toWei("0.05", "ether") });
    }

    static async rewardSubmission(submissionID, amount) {
        console.log("You " + this.accounts[0] + " are rewarding " + amount + " eth ");
        await this.instance.methods.rewardSubmission(submissionID).send({ from: this.accounts[0], value: this.web3.utils.toWei(amount, "ether") })
    }

    static async getSubmission(submissionID, contract) {
        return await this.instance.methods.getSubmission(submissionID).call();
    }



    static async test() {
        return this.getVars()
    }
}
export default blogUtils;