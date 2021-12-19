import { data } from "../warehouse";
import { SEARCH } from "./action";

const initialState = {
	warehouses: data,
	value: "",
	filter: {
		type: [],
		city: [],
		min: data[1].space_available,
		max: data[1].space_available,
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SEARCH: {
			const { value } = action;
			const warehouses = data.filter((val) =>
				val.name.toLowerCase().includes(value.toLowerCase())
			);
			let filter = { type: [], city: [] };
			warehouses.forEach(function (item) {
				if (filter.type.indexOf(item.type) === -1) filter.type.push(item.type);
				if (filter.city.indexOf(item.city) === -1) filter.city.push(item.city);
			});
			return { ...state, value, warehouses, filter };
		}
		default:
			state.warehouses.forEach(function (item) {
				if (state.filter.type.indexOf(item.type) === -1)
					state.filter.type.push(item.type);
				if (state.filter.city.indexOf(item.city) === -1)
					state.filter.city.push(item.city);
				if (item.space_available < state.filter.min) {
					state.filter.min = item.space_available;
				}
				if (item.space_available > state.filter.max) {
					state.filter.max = item.space_available;
				}
			});
			return state;
	}
}
