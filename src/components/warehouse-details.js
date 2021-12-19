import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../warehouse";
import { Link } from "react-router-dom";

function WarehouseDetails() {
	const { warehouseId } = useParams();
	const warehouse = data.find((prod) => prod.id === parseInt(warehouseId));
	return (
		<div className="warehouse-detail-wrapper">
			<Link className="link" to={`/`}>
				Back to listing
			</Link>
			<h1 className="heading">Warehouse Details</h1>
			<div className="warehouse-card">
				<img
					src="/warehouse.jpg"
					alt={warehouse.name}
					style={{ maxWidth: "100%" }}
				/>
				<div className="details-wrapper">
					<div className="detail">Name of Warehouse: {warehouse.name}</div>
					<div>City: {warehouse.city}</div>
					<div>Space Available: {warehouse.space_available}</div>
					<div>Cluster: {warehouse.cluster}</div>
					<div>Status: {warehouse.is_live ? "Active" : "Inactive"}</div>
				</div>
			</div>
		</div>
	);
}

export default WarehouseDetails;
