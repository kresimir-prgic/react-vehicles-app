import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import VehicleList from "./VehicleList";
import VehicleModelStore from "./VehicleModelStore";

import classes from './AllVehicles.module.css';

class AllVehiclesPage extends Component {

  render() {
    return (
			<section>
        <div className={classes['page-header']}>
          <h1>Vehicle Model Page</h1>
          <select id="abrv" className={classes.input}>
            <option value="">All</option>
            <option value="BMW">BMW</option>
            <option value="Ford">Ford</option>
          </select>
          <input className={classes.input} type="text" placeholder="Search..." value={this.props.vehicleModelStore.filter} onChange={event => this.props.vehicleModelStore.filterHandler(event)} />
        </div>
        {this.props.vehicleModelStore.isLoading && <h3>Loading...</h3>}
        {!this.props.vehicleModelStore.isLoading && 
				<VehicleList vehicles={this.props.vehicleModelStore.filteredVehicleModels} />}
			</section>
	  );
  }
	
}

export default inject(provider => ({
  vehicleModelStore: new VehicleModelStore()
}))(observer(AllVehiclesPage));
