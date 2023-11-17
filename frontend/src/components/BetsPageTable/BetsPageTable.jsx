import {useState} from 'react';
import BetsPageTableRow from "./BetsPageTableRow/BetsPageTableRow.jsx";
import ApproveModal from "./BetsPageTableRow/ApproveModal/ApproveModal.jsx";


const BetsPageTable = ({items}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [time, setTime] = useState(new Date());

    const handleModalShow = (item, time) => {
        setSelectedItem(item);
        setShowModal(true);
        setTime(time)
    };

    const handleModalClose = () => {
        setShowModal(false);
    };


    return (
        <div>
            {items.map((item) => (
                <BetsPageTableRow key={item.id} dayBetData={item} time={time} modalShow={handleModalShow}/>
            ))}
            <ApproveModal show={showModal} data={selectedItem} time={time} handleClose={handleModalClose}/>
        </div>
    );
};

export default BetsPageTable;