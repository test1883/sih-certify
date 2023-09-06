const { HDNodeWallet, ethers } = require("ethers");
const { NETWORK, PROVIDER, PATH, TOKEN_CONTRACT_ADDRESS, ABI } = require("./wallet.config");

const words = process.env.WORDS;
const node = HDNodeWallet.fromPhrase(words);

exports.address = async (index) => {
  let account = node.derivePath(`${PATH}/${index}`);
  return account.address;
};

exports.ethBalance = async (addr) => {
  // convert a currency unit from wei to ether
  const balance = ethers.formatEther(await PROVIDER.getBalance(addr));
  return balance;
};
exports.signer = async () => {
  let privateKey = process.env.SIGNER_PRIVATE_KEY;
  let signer = new ethers.Wallet(privateKey, PROVIDER);
  return signer;
};

exports.estimateGasFee = async () => {
  const feeData = await PROVIDER.getFeeData();
  return { gasPrice: ethers.formatUnits(feeData.gasPrice.toString(), "gwei"), maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas.toString(), "gwei"), maxPriorityFeePerGas: ethers.formatUnits(feeData.maxPriorityFeePerGas.toString(), "gwei") };
};