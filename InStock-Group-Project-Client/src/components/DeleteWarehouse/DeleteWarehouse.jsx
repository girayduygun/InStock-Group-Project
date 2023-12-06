import './DeleteWarehouse.scss';
import closeIcon from '../../assets/icons/close-24px.svg';

const DeleteWarehouse = ({ closeModal, warehouseModal, handleDelete }) => {


    const handleDeleteClick = () => {
        handleDelete(warehouseModal.id);
        closeModal(false);
    };
 
 
    return (
        <div className="modal">
            <div className="modal__overlay" onClick={() => {closeModal(false)}}></div>
            <div className="modal__container">
                <img src={closeIcon} className="modal__close" onClick={() => {closeModal(false)}} alt="" />
                <h1 className="modal__title">Delete {warehouseModal.warehouse_name} Warehouse?</h1>
                <p className="modal__paragraph">Please confirm that you would like to delete the {} warehouse from the list of warehouses. You won't be able to undo this action.</p>
                <div className="modal__controls">
                    <button className="modal__cancel modal__button" onClick={() => {closeModal(false)}}>cancel</button>
                    <button className="modal__delete modal__button" onClick={() => {handleDeleteClick()}}>delete</button>
                </div>
            </div>
        </div>
    );
 };

 export default DeleteWarehouse;