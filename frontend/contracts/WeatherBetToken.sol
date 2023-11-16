// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherBetToken is ERC20, Ownable {
    uint256 public constant TOKENS_PER_SEPOLIA = 1000000;

    constructor() ERC20("WeatherBetToken", "WBT") Ownable(msg.sender) {
        _mint(msg.sender, 50 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function buyTokens() external payable {
        require(msg.value > 0, "Must send Sepolia to buy tokens");
        uint256 tokensToMint = msg.value * TOKENS_PER_SEPOLIA;
        _mint(msg.sender, tokensToMint);
    }

    function withdraw() external {
        uint256 tokenBalance = balanceOf(msg.sender);
        require(tokenBalance > 0, "No tokens to withdraw");

        uint256 sepoliaAmount = tokenBalance / TOKENS_PER_SEPOLIA;
        require(
            address(this).balance >= sepoliaAmount,
            "Insufficient Sepolia balance in contract"
        );

        (bool sent, ) = msg.sender.call{value: sepoliaAmount}("");
        require(sent, "Failed to send Sepolia");

        _burn(msg.sender, tokenBalance);
    }

    function ownerWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Sepolia to withdraw");

        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to send Sepolia");
    }
}
