// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherBetting is Ownable {
    enum BetType {
        Temperature,
        WindSpeed
    }
    enum Direction {
        Higher,
        Lower
    }

    struct Bet {
        address bettor;
        uint256 amount;
        BetType betType;
        Direction direction;
        uint256 value; // Value to compare against, e.g., temperature in Celsius or wind speed in m/s
        uint256 timestampMinute;
        bool processed;
    }

    Bet[] public bets;
    mapping(uint256 => uint256) public actualTemperature; // Maps UNIX timestamp minute to temperature
    mapping(uint256 => uint256) public actualWindSpeed; // Maps UNIX timestamp minute to wind speed

    IERC20 public weatherBetToken;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        weatherBetToken = IERC20(_tokenAddress);
    }

    function placeBet(
        BetType _betType,
        Direction _direction,
        uint256 _value,
        uint256 _timestampMinute,
        uint256 _tokenAmount
    ) external {
        require(_tokenAmount > 0, "Bet amount must be greater than zero.");

        // Check if the contract has allowance to transfer the specified amount of tokens on behalf of msg.sender
        uint256 allowance = weatherBetToken.allowance(
            msg.sender,
            address(this)
        );
        require(allowance >= _tokenAmount, "Check the token allowance");

        // Try to transfer tokens from the bettor to the contract
        bool transferSuccess = weatherBetToken.transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );
        require(transferSuccess, "Token transfer failed.");

        // Create and store the bet
        Bet memory newBet = Bet({
            bettor: msg.sender,
            amount: _tokenAmount,
            betType: _betType,
            direction: _direction,
            value: _value,
            timestampMinute: _timestampMinute,
            processed: false
        });

        bets.push(newBet);
    }

    function updateWeatherData(
        uint256 _timestampMinute,
        uint256 _temperature,
        uint256 _windSpeed
    ) external onlyOwner {
        actualTemperature[_timestampMinute] = _temperature;
        actualWindSpeed[_timestampMinute] = _windSpeed;

        // Process all bets for this timestamp minute
        for (uint i = 0; i < bets.length; i++) {
            if (
                bets[i].timestampMinute == _timestampMinute &&
                !bets[i].processed
            ) {
                processBet(i);
            }
        }
    }

    function processBet(uint256 betIndex) internal {
        Bet storage bet = bets[betIndex];
        bool won = false;

        if (bet.betType == BetType.Temperature) {
            if (
                bet.direction == Direction.Higher &&
                actualTemperature[bet.timestampMinute] > bet.value
            ) {
                won = true;
            } else if (
                bet.direction == Direction.Lower &&
                actualTemperature[bet.timestampMinute] < bet.value
            ) {
                won = true;
            }
        } else if (bet.betType == BetType.WindSpeed) {
            if (
                bet.direction == Direction.Higher &&
                actualWindSpeed[bet.timestampMinute] > bet.value
            ) {
                won = true;
            } else if (
                bet.direction == Direction.Lower &&
                actualWindSpeed[bet.timestampMinute] < bet.value
            ) {
                won = true;
            }
        }

        if (won) {
            // For simplicity, we just return twice the bet amount in tokens in case of a win. A real contract might have more complex payout calculations.
            require(
                weatherBetToken.transfer(bet.bettor, bet.amount * 2),
                "Token transfer failed."
            );
        }

        // Mark bet as processed
        bet.processed = true;
    }
}
