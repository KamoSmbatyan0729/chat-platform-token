// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title ChatToken
 * @dev ERC-20 token for the decentralized chat platform with DAO governance capabilities
 * 
 * Features:
 * - Standard ERC-20 functionality
 * - Voting capabilities for DAO governance
 * - Controlled minting with inflation limits (0-7%)
 * - Burning capabilities
 * - Role-based access control
 */
contract ChatToken is ERC20, ERC20Permit, ERC20Votes, AccessControl {
    using Math for uint256;

    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant INFLATION_MANAGER_ROLE = keccak256("INFLATION_MANAGER_ROLE");

    // Inflation parameters
    uint256 public constant MAX_INFLATION_RATE = 700; // 7.00% (basis points)
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant SECONDS_PER_YEAR = 365 days;

    // Current inflation rate (in basis points, e.g., 500 = 5%)
    uint256 public inflationRate;
    
    // Last inflation timestamp
    uint256 public lastInflationTime;
    
    // Total tokens minted through inflation
    uint256 public totalInflationMinted;

    // Events
    event InflationRateUpdated(uint256 oldRate, uint256 newRate);
    event InflationMinted(uint256 amount, uint256 timestamp);
    event TokensBurned(address indexed from, uint256 amount);

    /**
     * @dev Constructor
     * @param name Token name
     * @param symbol Token symbol
     * @param initialSupply Initial token supply
     * @param initialInflationRate Initial inflation rate in basis points (0-700)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 initialInflationRate
    ) ERC20(name, symbol) ERC20Permit(name) {
        require(initialInflationRate <= MAX_INFLATION_RATE, "Inflation rate too high");
        
        // Grant roles to deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        _grantRole(INFLATION_MANAGER_ROLE, msg.sender);

        // Set initial parameters
        inflationRate = initialInflationRate;
        lastInflationTime = block.timestamp;

        // Mint initial supply
        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
        }
    }

    /**
     * @dev Mint tokens to specified address
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from specified address
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burnSelf(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Set inflation rate (DAO governance function)
     * @param newRate New inflation rate in basis points (0-700)
     */
    function setInflationRate(uint256 newRate) external onlyRole(INFLATION_MANAGER_ROLE) {
        require(newRate <= MAX_INFLATION_RATE, "Inflation rate exceeds maximum");
        
        uint256 oldRate = inflationRate;
        inflationRate = newRate;
        
        emit InflationRateUpdated(oldRate, newRate);
    }

    /**
     * @dev Calculate pending inflation tokens
     * @return amount Amount of tokens that can be minted through inflation
     */
    function calculatePendingInflation() public view returns (uint256) {
        if (inflationRate == 0) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - lastInflationTime;
        uint256 currentSupply = totalSupply();
        
        // Calculate annual inflation amount
        uint256 annualInflation = (currentSupply * inflationRate) / BASIS_POINTS;
        
        // Calculate pro-rated inflation for time elapsed
        uint256 pendingInflation = (annualInflation * timeElapsed) / SECONDS_PER_YEAR;
        
        return pendingInflation;
    }

    /**
     * @dev Mint inflation tokens to specified address
     * @param to Address to receive inflation tokens
     * @return amount Amount of tokens minted
     */
    function mintInflation(address to) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 amount = calculatePendingInflation();
        
        if (amount > 0) {
            _mint(to, amount);
            totalInflationMinted += amount;
            lastInflationTime = block.timestamp;
            
            emit InflationMinted(amount, block.timestamp);
        }
        
        return amount;
    }

    /**
     * @dev Get inflation statistics
     * @return currentRate Current inflation rate in basis points
     * @return lastMintTime Timestamp of last inflation mint
     * @return totalMinted Total tokens minted through inflation
     * @return pendingAmount Pending inflation tokens available to mint
     */
    function getInflationStats() external view returns (
        uint256 currentRate,
        uint256 lastMintTime,
        uint256 totalMinted,
        uint256 pendingAmount
    ) {
        return (
            inflationRate,
            lastInflationTime,
            totalInflationMinted,
            calculatePendingInflation()
        );
    }

    /**
     * @dev Get voting power of an account at current block
     * @param account Account to check voting power for
     * @return Voting power (token balance)
     */
    function getVotingPower(address account) external view returns (uint256) {
        return getVotes(account);
    }

    /**
     * @dev Get historical voting power of an account at specific block
     * @param account Account to check voting power for
     * @param blockNumber Block number to check at
     * @return Historical voting power
     */
    function getHistoricalVotingPower(address account, uint256 blockNumber) 
        external 
        view 
        returns (uint256) 
    {
        return getPastVotes(account, blockNumber);
    }

    // Required overrides for multiple inheritance

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
