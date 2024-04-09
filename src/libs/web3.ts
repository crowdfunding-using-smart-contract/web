import { Web3 } from "web3";
import { crowdfundingAbi, crowdfundingAddress } from "../utils/constant";

const web3 = new Web3("http://127.0.0.1:9650/ext/bc/ijkQqqjBExi6i9UmHUdQGvo1sJxEr4EyHdcEcrvRWMoagCMAb/rpc");
const crowdfundingContract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

export { crowdfundingContract };
