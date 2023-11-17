import "./BetsPageTableRow.css"

const BetsPageTableRow = ({dayBetData, modalShow, time}) => {
    let date = new Date(dayBetData.date * 1000);

    return (
        <div className={"BetsPageTableRow"}>

            <div className={"dateData"}>
                <div className={"dateCell"}>
                    {date.getDate()+"/"+(date.getMonth()+1)}
                </div>
            </div>
            <div className={"betsCells"}>
                {dayBetData.betsData.map((betData) => (
                    <div className={"BetsCell"} key={betData.id}>
                        <div className={"coefCell"} onClick={() => modalShow(betData, time)}>
                            {betData.coef}
                        </div>
                        {betData.type + " " + betData.temp}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default BetsPageTableRow;