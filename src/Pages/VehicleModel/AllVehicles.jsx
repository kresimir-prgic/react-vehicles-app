import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import VehicleList from "./VehicleList";
import VehicleModelStore from "./VehicleModelStore";

import classes from './AllVehicles.module.css';

class AllVehiclesPage extends Component {

  render() {
    if(this.props.vehicleModelStore.isLoading) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
			<section>
        <div className={classes['page-header']}>
          <h1>All Vehicle Models</h1>
          <input className={classes.input} type="text" placeholder="Search..." value={this.props.vehicleModelStore.filter} onChange={event => this.props.vehicleModelStore.filterHandler(event)} />
        </div>
				<VehicleList vehicles={this.props.vehicleModelStore.filteredVehicleModels} />
			</section>
	  );
  }
	
}

export default inject(provider => ({
  vehicleModelStore: new VehicleModelStore()
}))(observer(AllVehiclesPage));
