const typeOfBet = {
    moreThanTemp: "More Than (°C)",
    moreThanTempPlus: "More Than(°C)",
    lessThanTemp: "Less Than (°C)",
    lessThanTempPlus: "Less Than (°C)",
    moreThanWindSpeed: "More Than (m/s)",
    lessThanWindSpeed: "Less Than (m/s)",
};

const BetType = {
    Temperature: '0',
    WindSpeed: '1'
};

const Direction = {
    Higher: '0',
    Lower: '1'
};

export default typeOfBet;

export {BetType, Direction};