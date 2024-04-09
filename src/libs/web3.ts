import { Web3 } from "web3";
import { crowdfundingAbi, crowdfundingAddress } from "../utils/constant";

const web3 = new Web3("https://api.avax-test.network/ext/bc/C/rpc");
const crowdfundingContract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

export { web3, crowdfundingContract };
