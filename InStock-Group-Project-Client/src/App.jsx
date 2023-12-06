import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WarehouseListPage from './pages/WarehouseListPage/WareHouseListPage';
import InventoryListPage from './pages/InventoryListPage/InventoryListPage';
import InventoryDetailsPage from './pages/InventoryDetailsPage/InventoryDetailsPage';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import EditInventory from './pages/EditInventory/EditInventory';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import AddInventory from './pages/AddInventory/AddInventory';
import NotFound from './components/NotFound/NotFound';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<WarehouseListPage/>}/>
            <Route path="/inventory" element={<InventoryListPage/>}/>
            <Route path="/warehouse/:id" element={<WarehouseDetails/>}/>
            <Route path="/inventory/:id" element={<InventoryDetailsPage/>}/>
            <Route path="/warehouse/:id/edit" element={<EditWarehouse/>}/>
            <Route path="/inventory/:id/edit" element={<EditInventory/>}/> 
            <Route path="/warehouse-add" element={<AddWarehouse/>}/>
            <Route path="/inventory-add" element={<AddInventory/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main> 
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;