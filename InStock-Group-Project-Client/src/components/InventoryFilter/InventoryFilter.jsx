import './InventoryFilter.scss';
import sort from '../../assets/icons/sort-24px.svg';

const InventoryFilter = () => {
    return (
        <section className="filter">
            <div className="filter__item filter__column">
                <h6 className="filter__title">INVENTORY ITEM</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
            <div className="filter__category filter__column">
                <h6 className="filter__title">CATEGORY</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
            <div className="filter__status filter__column">
                <h6 className="filter__title">STATUS</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
            <div className="filter__qty filter__column">
                <h6 className="filter__title">QTY</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
            <div className="filter__warehouses filter__column">
                <h6 className="filter__title">WAREHOUSES</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
            <div className="filter__actions filter__column">
                <h6 className="filter__title">ACTIONS</h6>
                <img src={sort} alt="sort icon" className='filter__icon'/>
            </div>
        </section>
    );
};


export default InventoryFilter;