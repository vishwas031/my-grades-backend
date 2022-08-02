import Web3 from "web3";

import { address, abi } from "../../utils/contractData";
import { WEB3_PROVIDER, ACCOUNT_PRIVATE_KEY } from "../../common/config";

class BlockchainService {
  constructor() {
    const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abi, address);
  }

  async issue(hash, roll, sem) {
    try {
      //Encode Data to be sent(Function call with parameters)
      const encodedData = this.contract.methods
        .set(`0x${hash}`, sem, `0x${roll}`)
        .encodeABI();
      const signedTransaction = await this.signTransaction(encodedData);
      const status = await this.sendTransaction(signedTransaction);
      return status;
    } catch (err) {
      console.log("[ERR]", err);
    }
  }

  async verify(roll, sem, targetHash) {
    try{
      const hash = await this.contract.methods.get(`0x${roll}`, sem).call();
      console.log({hash})
      if (hash == `0x${targetHash}`) return true;
      return false;
    }catch(err){
      console.log(err)
    }
  }

  async signTransaction(encodedData) {
    //Sign transaction with private key
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      {
        to: address,
        data: encodedData,
        gas: 1000000,
      },
      ACCOUNT_PRIVATE_KEY
    );
    return signedTransaction;
  }

  async sendTransaction(signedTransaction) {
    //Send the signed transaction
    const receipt = await this.web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    return receipt.status;
  }
}

export default new BlockchainService();
