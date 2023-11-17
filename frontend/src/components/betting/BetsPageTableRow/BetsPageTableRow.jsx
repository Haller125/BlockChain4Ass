import "./BetsPageTableRow.css"

const BetsPageTableRow = ({ dayBetData, modalShow, time }) => {
    let date = new Date(dayBetData.date * 1000);

    return (
        
        <div className={"BetsPageTableRow"}>

            <div className={"dateData"}>
                <div className={"dateCell"}>
                    <p>{date.getDate() + "/" + (date.getMonth() + 1)}</p>
                </div>
            </div>
            <div className={"betsCells"}>
                {dayBetData.betsData.map((betData) => {
                    const key = betData.temp + "_" + betData.coef + "_" + betData.type;
                    return <div className={"BetsCell"} key={key} onClick={() => modalShow(betData, time)}>
                        <div className={"coefCell"} >
                            <p>{betData.coef}</p>
                        </div>
                        <p>{betData.type.split('(')[0] + " " + betData.temp + betData.type.split('(')[1].split(")")[0]}</p>
                    </div>;
                })}
            </div>

        </div>
    );
}

export default BetsPageTableRow;