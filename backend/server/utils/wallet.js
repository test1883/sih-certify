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

exports.tokenBalance = async (addr) => {
  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, PROVIDER);
  var decimal = await contract.decimals();
  var tokenName = await contract.name();
  var tokenSymbol = await contract.symbol();
  const balance = ethers.formatUnits(await contract.balanceOf(addr), decimal);
  return { balance, decimal, tokenName, tokenSymbol };
};

exports.signerAndContract = async () => {
  let privateKey = process.env.SIGNER_PRIVATE_KEY;
  let signer = new ethers.Wallet(privateKey, PROVIDER);
  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ABI, PROVIDER);
  const contractSigner = contract.connect(signer);
//   contractSigner.VerifyMessage("0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8", 27, "0x5f56b819a731cb4a885736522b2f01b063b7492c59584174b3192392a839f22a", "0x2d20a2af65ee098efc889579d28bf7933e8ca12381efca9d939a7d7bca737199").then(e => console.log(e))
//   contract.VerifyMessage("0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8", 27, "0x5f56b819a731cb4a885736522b2f01b063b7492c59584174b3192392a839f22a", "0x2d20a2af65ee098efc889579d28bf7933e8ca12381efca9d939a7d7bca737199").then(e => console.log(e))
  return {signer, contractSigner};
};

exports.estimateGasFee = async () => {
  const feeData = await PROVIDER.getFeeData();
  return { gasPrice: ethers.formatUnits(feeData.gasPrice.toString(), "gwei"), maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas.toString(), "gwei"), maxPriorityFeePerGas: ethers.formatUnits(feeData.maxPriorityFeePerGas.toString(), "gwei") };
};