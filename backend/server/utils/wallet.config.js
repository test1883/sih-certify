const { ethers } = require("ethers");
const Certify = require("../abi/contracts/Certify.sol/Certify.json")

const isProd = false;
const MAINNET_HD_WALLET = "m/44'/60'/0'/0";
const TESTNET_HD_WALLET = "m/44'/1'/0'/0";
const NETWORK = isProd ? "mainnet" : "sepolia";
module.exports = Object.freeze({
  NETWORK,
  PROVIDER: isProd ? ethers.getDefaultProvider() : new ethers.InfuraProvider(NETWORK, process.env.INFURA_API_KEY),
  PATH: isProd ? MAINNET_HD_WALLET : TESTNET_HD_WALLET,
  TOKEN_CONTRACT_ADDRESS: process.env.CONTRACT,
  ABI: Certify.abi,
});