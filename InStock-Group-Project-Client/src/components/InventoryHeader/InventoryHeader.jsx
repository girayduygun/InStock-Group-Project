import './InventoryHeader.scss';
import { Link } from 'react-router-dom';

const InventoryHeader = () => {
    return (
        <section className="inventory">
            <div className="inventory__nav">
                <div className="inventory__header">
                    <h1 className="inventory__title">Inventory</h1>
                </div>

                <div className="inventory__controls">
                    <input type="text" className="inventory__search" placeholder='Search...'/>
                    <Link to="/inventory-add" className="inventory__button">+ Add New Item</Link>
                </div>
            </div>
        </section>
    );
};

export default InventoryHeader;