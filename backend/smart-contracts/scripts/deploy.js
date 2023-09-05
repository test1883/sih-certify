const hre = require("hardhat");
require("dotenv").config()

async function main() {
  const [ deployer ] = await hre.ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address);
  const Certify = await hre.ethers.getContractFactory("Certify");
  const CertifyContract = await Certify.deploy(process.env.OWNER);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
