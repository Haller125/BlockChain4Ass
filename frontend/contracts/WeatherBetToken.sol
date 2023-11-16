// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherBetToken is ERC20, Ownable {
    mapping(address => uint256) public lastAccessTime;
    uint256 public constant BASE_DAILY_TOKEN_AMOUNT = 10;
    uint256 public constant TIME_BETWEEN_FAUCETS = 1 days;

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

    function faucet() external {
        require(
            block.timestamp - lastAccessTime[msg.sender] >=
                TIME_BETWEEN_FAUCETS,
            "Faucet can only be accessed once per day"
        );
        lastAccessTime[msg.sender] = block.timestamp;
        _mint(msg.sender, BASE_DAILY_TOKEN_AMOUNT * 10 ** decimals());
    }
}
