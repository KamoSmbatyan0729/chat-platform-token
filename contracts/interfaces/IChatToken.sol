// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IChatToken
 * @dev Interface for the ChatToken contract
 */
interface IChatToken is IERC20 {
    // Minting functions
    function mint(address to, uint256 amount) external;
    function mintInflation(address to) external returns (uint256);
    
    // Burning functions
    function burn(address from, uint256 amount) external;
    function burnSelf(uint256 amount) external;
    
    // Inflation management
    function setInflationRate(uint256 newRate) external;
    function calculatePendingInflation() external view returns (uint256);
    function getInflationStats() external view returns (
        uint256 currentRate,
        uint256 lastMintTime,
        uint256 totalMinted,
        uint256 pendingAmount
    );
    
    // Voting functions
    function getVotingPower(address account) external view returns (uint256);
    function getHistoricalVotingPower(address account, uint256 blockNumber) external view returns (uint256);
    
    // Events
    event InflationRateUpdated(uint256 oldRate, uint256 newRate);
    event InflationMinted(uint256 amount, uint256 timestamp);
    event TokensBurned(address indexed from, uint256 amount);
}
