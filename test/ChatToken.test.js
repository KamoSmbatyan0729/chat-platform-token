const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ChatToken", () => {
  let chatToken
  let owner, addr1, addr2
  const INITIAL_SUPPLY = ethers.parseEther("1000000")
  const INITIAL_INFLATION_RATE = 300 // 3%

  beforeEach(async () => {
    ;[owner, addr1, addr2] = await ethers.getSigners()

    const ChatToken = await ethers.getContractFactory("ChatToken")
    chatToken = await ChatToken.deploy("ChatPlatform Token", "CHAT", INITIAL_SUPPLY, INITIAL_INFLATION_RATE)
  })

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await chatToken.hasRole(await chatToken.DEFAULT_ADMIN_ROLE(), owner.address)).to.be.true
    })

    it("Should assign the total supply to the owner", async () => {
      const ownerBalance = await chatToken.balanceOf(owner.address)
      expect(await chatToken.totalSupply()).to.equal(ownerBalance)
    })

    it("Should set correct inflation rate", async () => {
      expect(await chatToken.inflationRate()).to.equal(INITIAL_INFLATION_RATE)
    })
  })

  describe("Minting", () => {
    it("Should allow minter to mint tokens", async () => {
      const mintAmount = ethers.parseEther("1000")
      await chatToken.mint(addr1.address, mintAmount)

      expect(await chatToken.balanceOf(addr1.address)).to.equal(mintAmount)
    })

    it("Should not allow non-minter to mint tokens", async () => {
      const mintAmount = ethers.parseEther("1000")
      await expect(chatToken.connect(addr1).mint(addr2.address, mintAmount)).to.be.reverted
    })
  })

  describe("Burning", () => {
    it("Should allow users to burn their own tokens", async () => {
      const burnAmount = ethers.parseEther("1000")
      await chatToken.transfer(addr1.address, burnAmount)

      await chatToken.connect(addr1).burnSelf(burnAmount)
      expect(await chatToken.balanceOf(addr1.address)).to.equal(0)
    })

    it("Should allow burner role to burn tokens", async () => {
      const burnAmount = ethers.parseEther("1000")
      await chatToken.transfer(addr1.address, burnAmount)

      await chatToken.burn(addr1.address, burnAmount)
      expect(await chatToken.balanceOf(addr1.address)).to.equal(0)
    })
  })

  describe("Inflation", () => {
    it("Should calculate pending inflation correctly", async () => {
      // Fast forward time by 1 year
      await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60])
      await ethers.provider.send("evm_mine")

      const pendingInflation = await chatToken.calculatePendingInflation()
      const expectedInflation = (INITIAL_SUPPLY * BigInt(INITIAL_INFLATION_RATE)) / BigInt(10000)

      // Allow for small rounding differences
      expect(pendingInflation).to.be.closeTo(expectedInflation, ethers.parseEther("100"))
    })

    it("Should mint inflation tokens", async () => {
      // Fast forward time by 1 year
      await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60])
      await ethers.provider.send("evm_mine")

      const initialSupply = await chatToken.totalSupply()
      await chatToken.mintInflation(addr1.address)
      const newSupply = await chatToken.totalSupply()

      expect(newSupply).to.be.gt(initialSupply)
    })

    it("Should update inflation rate", async () => {
      const newRate = 500 // 5%
      await chatToken.setInflationRate(newRate)

      expect(await chatToken.inflationRate()).to.equal(newRate)
    })

    it("Should not allow inflation rate above maximum", async () => {
      const invalidRate = 800 // 8% (above 7% max)
      await expect(chatToken.setInflationRate(invalidRate)).to.be.revertedWith("Inflation rate exceeds maximum")
    })
  })

  describe("Voting", () => {
    it("Should track voting power correctly", async () => {
      const transferAmount = ethers.parseEther("1000")
      await chatToken.transfer(addr1.address, transferAmount)

      // Delegate to self to activate voting power
      await chatToken.connect(addr1).delegate(addr1.address)

      expect(await chatToken.getVotingPower(addr1.address)).to.equal(transferAmount)
    })
  })
})
