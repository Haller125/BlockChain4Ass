// eslint-disable-next-line no-unused-vars
import React from 'react';
import BetsPageTableRow from "./BetsPageTableRow/BetsPageTableRow.jsx";


const BetsPageTable = ({items}) => {
    console.log(items);
    return (
        <div>
            {items.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <BetsPageTableRow dayBetData={item}/>
            ))}
        </div>
    );
};

export default BetsPageTable;