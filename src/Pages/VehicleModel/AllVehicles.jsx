import { observer, Provider } from "mobx-react";

import VehicleList from "./VehicleList";
import VehicleModelStore from "./VehicleModelStore";

function AllVehiclesPage() {
	return (
		<Provider VehicleModelStore={VehicleModelStore}>
			<section>
				<h1>All Vehicle Models</h1>
				<VehicleList vehicles={VehicleModelStore.vehicleModelData} />
			</section>
		</Provider>
	);
}

export default observer(AllVehiclesPage);
