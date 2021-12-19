import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WarehousesList from "./components/warehouses-list";
import WarehouseDetails from "./components/warehouse-details";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<WarehousesList />} />
				<Route
					exact
					path="/warehouses/:warehouseId"
					element={<WarehouseDetails />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
