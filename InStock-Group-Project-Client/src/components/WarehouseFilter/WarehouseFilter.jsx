import './WarehouseFilter.scss';
import sort from '../../assets/icons/sort-24px.svg';

const WarehouseFilter = () => {
    return (
        <section className="Wfilter">
            <div className="Wfilter__warehouse Wfilter__column">
                <h6 className="Wfilter__title">warehouse</h6>
                <img src={sort} alt="sort icon" className='Wfilter__icon'/>
            </div>
            <div className="Wfilter__address Wfilter__column">
                <h6 className="Wfilter__title">address</h6>
                <img src={sort} alt="sort icon" className='Wfilter__icon'/>
            </div>
            <div className="Wfilter__name Wfilter__column">
                <h6 className="Wfilter__title">contact name</h6>
                <img src={sort} alt="sort icon" className='Wfilter__icon'/>
            </div>
            <div className="Wfilter__information Wfilter__column">
                <h6 className="Wfilter__title">contact information</h6>
                <img src={sort} alt="sort icon" className='Wfilter__icon'/>
            </div>
            <div className="Wfilter__actions Wfilter__column">
                <h6 className="Wfilter__title">actions</h6>
                <img src={sort} alt="sort icon" className='Wfilter__icon'/>
            </div>
        </section>
    );
};

export default WarehouseFilter;