const { ethers } = require("hardhat")

async function main() {
  console.log("Deploying ChatToken...")

  // Get the deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)

  // Token parameters
  const TOKEN_NAME = "ChatPlatform Token"
  const TOKEN_SYMBOL = "CHAT"
  const INITIAL_SUPPLY = ethers.parseEther("1000000") // 1M tokens
  const INITIAL_INFLATION_RATE = 300 // 3% in basis points

  // Deploy the token
  const ChatToken = await ethers.getContractFactory("ChatToken")
  const chatToken = await ChatToken.deploy(TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY, INITIAL_INFLATION_RATE)

  await chatToken.waitForDeployment()
  const tokenAddress = await chatToken.getAddress()

  console.log("ChatToken deployed to:", tokenAddress)
  console.log("Token Name:", TOKEN_NAME)
  console.log("Token Symbol:", TOKEN_SYMBOL)
  console.log("Initial Supply:", ethers.formatEther(INITIAL_SUPPLY))
  console.log("Initial Inflation Rate:", INITIAL_INFLATION_RATE / 100, "%")

  // Verify deployment
  const totalSupply = await chatToken.totalSupply()
  const inflationRate = await chatToken.inflationRate()

  console.log("\nDeployment Verification:")
  console.log("Total Supply:", ethers.formatEther(totalSupply))
  console.log("Inflation Rate:", inflationRate.toString(), "basis points")

  return tokenAddress
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
