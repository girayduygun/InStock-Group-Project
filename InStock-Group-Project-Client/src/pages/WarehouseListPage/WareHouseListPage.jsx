import './WarehouseListPage.scss';
import WarehouseHeader from '../../components/WarehouseHeader/WarehouseHeader';
import WarehouseFilter from '../../components/WarehouseFilter/WarehouseFilter';
import WarehouseListTile from '../../components/WarehouseListTile/WarehouseListTile';


const WareHouseListPage = () => {

    return (
        <section className='warehouse__container'>
            <WarehouseHeader />
            <WarehouseFilter />
            <WarehouseListTile/>
        </section>
    );
};

export default WareHouseListPage;