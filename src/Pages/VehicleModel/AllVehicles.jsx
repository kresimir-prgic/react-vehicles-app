import { observer } from "mobx-react";

import VehicleList from "./VehicleList";
import VehicleModelStore from "./VehicleModelStore";

import classes from './AllVehicles.module.css';

function AllVehiclesPage() {
  const isLoading = VehicleModelStore.isLoading;

  const filterHandler = (event) => {
    VehicleModelStore.filter = event.target.value;
  }

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }
	return (
			<section>
        <div className={classes['page-header']}>
          <h1>All Vehicle Models</h1>
          <input className={classes.input} type="text" placeholder="Search..." value={VehicleModelStore.filter} onChange={filterHandler} />
        </div>
				<VehicleList vehicles={VehicleModelStore.filteredVehicleModels} />
			</section>
	);
}

export default observer(AllVehiclesPage);
