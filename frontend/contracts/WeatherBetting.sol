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
        uint256 timestampDay; // Timestamp representing the day (00:00)
        uint256 coefficient;
        bool processed;
    }

    Bet[] public bets;
    mapping(uint256 => uint256) public actualTemperature;
    mapping(uint256 => uint256) public actualWindSpeed;

    IERC20 public weatherBetToken;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        weatherBetToken = IERC20(_tokenAddress);
    }

    function placeBet(
        BetType _betType,
        Direction _direction,
        uint256 _value,
        uint256 _timestampMinute,
        uint256 _tokenAmount,
        uint256 _coefficient
    ) external {
        require(_tokenAmount > 0, "Bet amount must be greater than zero.");

        uint256 allowance = weatherBetToken.allowance(
            msg.sender,
            address(this)
        );
        require(allowance >= _tokenAmount, "Check the token allowance");

        bool transferSuccess = weatherBetToken.transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );
        require(transferSuccess, "Token transfer failed.");

        // Truncate to 00:00 of the day and check it's not in the past
        uint256 timestampDay = _timestampMinute - (_timestampMinute % 86400);
        require(
            timestampDay >= block.timestamp - (block.timestamp % 86400),
            "Cannot place bet for past date"
        );

        Bet memory newBet = Bet({
            bettor: msg.sender,
            amount: _tokenAmount,
            betType: _betType,
            direction: _direction,
            value: _value,
            timestampDay: timestampDay,
            coefficient: _coefficient,
            processed: false
        });

        bets.push(newBet);
    }

    function updateWeatherData(
        uint256 _timestampDay,
        uint256 _temperature,
        uint256 _windSpeed
    ) external onlyOwner {
        // Truncate to 00:00 of the day
        uint256 timestampDay = _timestampDay - (_timestampDay % 86400);

        actualTemperature[timestampDay] = _temperature;
        actualWindSpeed[timestampDay] = _windSpeed;

        // Process all bets for the day
        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].timestampDay == timestampDay && !bets[i].processed) {
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
                actualTemperature[bet.timestampDay] > bet.value
            ) {
                won = true;
            } else if (
                bet.direction == Direction.Lower &&
                actualTemperature[bet.timestampDay] < bet.value
            ) {
                won = true;
            }
        } else if (bet.betType == BetType.WindSpeed) {
            if (
                bet.direction == Direction.Higher &&
                actualWindSpeed[bet.timestampDay] > bet.value
            ) {
                won = true;
            } else if (
                bet.direction == Direction.Lower &&
                actualWindSpeed[bet.timestampDay] < bet.value
            ) {
                won = true;
            }
        }

        if (won) {
            // For simplicity, we just return twice the bet amount in tokens in case of a win. A real contract might have more complex payout calculations.
            require(
                weatherBetToken.transfer(
                    bet.bettor,
                    bet.amount * bet.coefficient
                ),
                "Token transfer failed."
            );
        }

        // Mark bet as processed
        bet.processed = true;
    }

    function getBetCount() external view returns (uint256) {
        return bets.length;
    }
}
