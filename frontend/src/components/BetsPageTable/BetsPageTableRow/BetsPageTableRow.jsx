import "./BetsPageTableRow.css"
import {useState} from "react";

// eslint-disable-next-line no-unused-vars,react-refresh/only-export-components

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
                    // eslint-disable-next-line react/jsx-key
                    <div className={"BetsCell"}>
                        <div key={betData.id} className={"coefCell"} onClick={() => modalShow(betData, time)}>
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