import './InventoryListPage.scss';
import InventoryHeader from '../../components/InventoryHeader/InventoryHeader';
import InventoryFilter from '../../components/InventoryFilter/InventoryFilter';
import InventoryListTile from '../../components/InventoryListTile/InventoryListTile';

const InventoryListPage = () => {
    return (
        <section className='inventory__container'>
            <InventoryHeader />
            <InventoryFilter />
            <InventoryListTile />
        </section>
    );
};

export default InventoryListPage;