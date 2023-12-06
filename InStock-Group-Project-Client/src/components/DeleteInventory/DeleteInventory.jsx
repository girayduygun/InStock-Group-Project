import './DeleteInventory.scss';
import closeIcon from '../../assets/icons/close-24px.svg';

const DeleteInventory = ({ closeModal, inventoryModal, handleDelete }) => {


    const handleDeleteClick = () => {
        handleDelete(inventoryModal.id);
        closeModal(false);
    };
 
 
    return (
        <div className="Imodal">
            <div className="Imodal__overlay" onClick={() => {closeModal(false)}}></div>
            <div className="Imodal__container">
                <img src={closeIcon} className="Imodal__close" onClick={() => {closeModal(false)}} alt="" />
                <h1 className="Imodal__title">Delete {inventoryModal.item_name} from your inventory?</h1>
                <p className="Imodal__paragraph">Please confirm that you would like to delete the {inventoryModal.item_name} product from the list of inventories. You won't be able to undo this action.</p>
                <div className="Imodal__controls">
                    <button className="Imodal__cancel modal__button" onClick={() => {closeModal(false)}}>cancel</button>
                    <button className="Imodal__delete modal__button" onClick={() => {handleDeleteClick()}}>delete</button>
                </div>
            </div>
        </div>
    );
 };

 export default DeleteInventory;