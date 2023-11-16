import "./BetsPageTableRow.css"

// eslint-disable-next-line no-unused-vars,react-refresh/only-export-components

/**return {
    date,
    moreThanTemp,
    moreThanTempCoef,
    moreThanTempPlus,
    moreThanTempPlusCoef,
    lessThanTemp,
    lessThanTempCoef,
    lessThanTempPlus,
    lessThanTempPlusCoef,
    moreThanWindSpeed,
    moreThanWindSpeedCoef,
    lessThanWindSpeed,
    lessThanWindSpeedCoef
 }**/
const BetsPageTableRow = ({dayBetData}) => {
    let date = new Date(dayBetData.date * 1000);
    return (
        <div className={"BetsPageTableRow"}>
            <div className={"dateData"}>
                <div className={"dateCell"}>
                    {date.getDate()+"/"+(date.getMonth()+1)}
                </div>
            </div>
            <div className={"betsCells"}>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.moreThanTempCoef}
                    </div>
                    {dayBetData.moreThanTemp}
                </div>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.moreThanTempPlusCoef}
                    </div>
                    {dayBetData.moreThanTempPlus}
                </div>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.lessThanTempCoef}
                    </div>
                    {dayBetData.lessThanTemp}
                </div>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.lessThanTempPlusCoef}
                    </div>
                    {dayBetData.lessThanTempPlus}
                </div>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.moreThanWindSpeedCoef}
                    </div>
                    {dayBetData.moreThanWindSpeed}
                </div>
                <div className={"BetsCell"}>
                    <div className={"coefCell"}>
                        {dayBetData.lessThanWindSpeedCoef}
                    </div>
                    {dayBetData.lessThanWindSpeed}
                </div>
            </div>
        </div>
    );
}

export default BetsPageTableRow;