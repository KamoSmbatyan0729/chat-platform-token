// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ChatToken.sol";

/**
 * @title ChatTokenDeployer
 * @dev Factory contract for deploying ChatToken instances
 */
contract ChatTokenDeployer {
    event TokenDeployed(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply,
        uint256 inflationRate
    );

    /**
     * @dev Deploy a new ChatToken contract
     * @param name Token name
     * @param symbol Token symbol
     * @param initialSupply Initial token supply (in wei)
     * @param initialInflationRate Initial inflation rate in basis points (0-700)
     * @return tokenAddress Address of the deployed token contract
     */
    function deployToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 initialInflationRate
    ) external returns (address tokenAddress) {
        ChatToken token = new ChatToken(
            name,
            symbol,
            initialSupply,
            initialInflationRate
        );
        
        tokenAddress = address(token);
        
        // Transfer ownership to deployer
        token.grantRole(token.DEFAULT_ADMIN_ROLE(), msg.sender);
        token.renounceRole(token.DEFAULT_ADMIN_ROLE(), address(this));
        
        emit TokenDeployed(
            tokenAddress,
            name,
            symbol,
            initialSupply,
            initialInflationRate
        );
    }
}
