import React, { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../redux/action";
import { connect } from "react-redux";

function WarehousesList(props) {
	const { warehouses, value, filter } = props.data;
	const [selectedCity, setSelectedCity] = useState([]);
	const [selectedType, setSelectedType] = useState([]);
	const [range, setRange] = useState(filter.max);

	function handleCity(e) {
		if (!selectedCity.includes(e.target.value) && e.target.checked) {
			setSelectedCity((old) => [...old, e.target.value]);
		} else {
			setSelectedCity(selectedCity.filter((item) => item !== e.target.value));
		}
	}
	function handleType(e) {
		if (!selectedType.includes(e.target.value) && e.target.checked) {
			setSelectedType((old) => [...old, e.target.value]);
		} else {
			setSelectedType(selectedType.filter((item) => item !== e.target.value));
		}
	}
	return (
		<div>
			<div className="filter-wrapper">
				<input
					className="search-input"
					onChange={(e) => props.search(e.target.value)}
					value={value}
					placeholder="Search by warehouse name..."
				/>
				<br />

				<div className="filter">
					<label>City</label>
					<ul className="list">
						{filter.city.map((city, index) => {
							return (
								<li key={index}>
									<div className="toppings-list-item">
										<div className="left-section">
											<input
												type="checkbox"
												name={city}
												value={city}
												onChange={(e) => handleCity(e)}
												checked={selectedCity.includes(city)}
											/>
											<label htmlFor={`custom-checkbox-${index}`}>{city}</label>
										</div>
									</div>
								</li>
							);
						})}
					</ul>

					<label>Type</label>
					<ul className="list">
						{filter.type.map((type, index) => {
							return (
								<li key={index}>
									<div className="toppings-list-item">
										<div className="left-section">
											<input
												type="checkbox"
												name={type}
												value={type}
												onChange={(e) => handleType(e)}
												checked={selectedType.includes(type)}
											/>
											<label htmlFor={`custom-checkbox-${index}`}>{type}</label>
										</div>
									</div>
								</li>
							);
						})}
					</ul>

					<div className="slider">
						<label>
							Space available upto: <span id="demo">{range}</span>
						</label>
						<br />
						<input
							type="range"
							min={filter.min}
							max={filter.max}
							value={range}
							id="myRange"
							onChange={(e) => setRange(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Space Available</th>
						<th>City</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{warehouses &&
						warehouses.map((warehouse, index) => {
							if (
								(selectedCity.length === 0 &&
									selectedType.length === 0 &&
									warehouse.space_available <= range) ||
								(selectedCity.length > 0 &&
									selectedType.length === 0 &&
									selectedCity.includes(warehouse.city) &&
									warehouse.space_available <= range) ||
								(selectedCity.length === 0 &&
									selectedType.length > 0 &&
									selectedType.includes(warehouse.type) &&
									warehouse.space_available <= range) ||
								(selectedCity.length > 0 &&
									selectedType.length > 0 &&
									selectedCity.includes(warehouse.city) &&
									selectedType.includes(warehouse.type) &&
									warehouse.space_available <= range)
							) {
								return (
									<tr key={index}>
										<td>
											<Link to={`/warehouses/${warehouse.id}`} className="link">
												{warehouse.name}
											</Link>
										</td>
										<td>{warehouse.space_available}</td>
										<td>{warehouse.city}</td>
										<td>{warehouse.type}</td>
									</tr>
								);
							} else return null;
						})}
				</tbody>
			</table>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		data: state.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		search: (value) => dispatch(search(value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehousesList);
