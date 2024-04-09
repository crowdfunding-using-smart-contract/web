import { Web3 } from "web3";
import { crowdfundingAbi, crowdfundingAddress } from "../utils/constant";

const web3 = new Web3("http://127.0.0.1:9650/ext/bc/2pKosJ1dPXbXHUgj42JQZVEQSHRoudv3AoUvMHZf2cFSr64Pmt/rpc");
const crowdfundingContract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

export { web3, crowdfundingContract };
