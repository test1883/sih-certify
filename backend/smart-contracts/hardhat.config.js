require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: '../server/abi',
  },
  networks: {
    hardhat: {
      gas: 1000000,
      gasLimit: 1000000,
      allowUnlimitedContractSize: true
    },
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.API_KEY]
    },
  }
};