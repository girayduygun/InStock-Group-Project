import './WarehouseHeader.scss';
import { Link } from 'react-router-dom';

const WarehouseHeader = () => {
    return (
        <section className="warehouse">
            <div className="warehouse__nav">
                <div className="warehouse__header">
                    <h1 className="warehouse__title">warehouses</h1>
                </div>

                <div className="warehouse__controls">
                    <input type="text" className="warehouse__search" placeholder='search'/>
                    <Link to="/warehouse-add" className="warehouse__button">+ Add New Warehouse</Link>
                </div>
            </div>
        </section>
    );
};

export default WarehouseHeader;