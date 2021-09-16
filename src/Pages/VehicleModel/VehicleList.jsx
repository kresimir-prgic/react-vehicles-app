import VehicleItem from "./VehicleItem";

import classes from "./VehicleList.module.css";

function VehicleList(props) {
	return (
			<ul className={classes["vehicle-list"]}>
				{props.vehicles.map((vehicle) => (
					<VehicleItem
						key={vehicle.id}
						id={vehicle.id}
						makeId={vehicle.makeId}
						name={vehicle.name}
						abrv={vehicle.abrv}
					/>
				))}
			</ul>
	);
}

export default VehicleList;
