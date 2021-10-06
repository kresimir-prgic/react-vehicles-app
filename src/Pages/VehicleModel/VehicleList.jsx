import ItemList from "../../Components/ItemList";

function VehicleList(props) {
	return (
		<ItemList>
			{props.vehicles.map((vehicle) => (
				<li
					key={vehicle.id}
					id={vehicle.id}
					name={vehicle.name}
					abrv={vehicle.abrv}
					onClick={() => props.editModel(vehicle.id)}
				>
					<h3 title="Click to edit">
						{vehicle.abrv} <span>{vehicle.name}</span>
					</h3>
				</li>
			))}
		</ItemList>
	);
}

export default VehicleList;
