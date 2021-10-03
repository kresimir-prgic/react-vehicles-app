import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import VehicleModelStore from "./VehicleModelStore";
import VehicleMakeStore from "../VehicleMake/VehicleMakeStore";

import VehicleList from "./VehicleList";
import VehicleModelForm from "./VehicleModelForm";

import classes from "./AllVehicles.module.css";

class AllVehiclesPage extends Component {
	render() {
		return (
			<section>
				<div>
					Not on the list?
					<a
						href="#0"
						onClick={(event) =>
							this.props.vehicleModelStore.newFormHandler(event)
						}
					>
						Add new
					</a>
				</div>
				{this.props.vehicleModelStore.formVisible && (
					<VehicleModelForm
						selectHandler={event => this.props.vehicleModelStore.newFormSelectHandler(event)}
						vehicleMakeData={this.props.vehicleMakeStore.vehicleMakeData}
						changeName={event => this.props.vehicleModelStore.changeNameHandler(event)}
            onSubmit={event => this.props.vehicleModelStore.addNewModel(event)}
					/>
				)}
				<div className={classes["page-header"]}>
					<h1>Vehicle Model List</h1>
					<select
						className={classes.input}
						onChange={(event) =>
							this.props.vehicleModelStore.selectHandler(event)
						}
					>
						<option value="">All</option>
						{this.props.vehicleMakeStore.vehicleMakeData.map((make) => (
							<option key={make.id} value={make.id}>
								{make.name}
							</option>
						))}
					</select>
					<input
						className={classes.input}
						type="text"
						placeholder="Search..."
						value={this.props.vehicleModelStore.filter}
						onChange={(event) =>
							this.props.vehicleModelStore.filterHandler(event)
						}
					/>
				</div>
				{this.props.vehicleModelStore.isLoading && <h3>Loading...</h3>}
				{!this.props.vehicleModelStore.isLoading && (
					<VehicleList
						vehicles={this.props.vehicleModelStore.filteredVehicleModels}
					/>
				)}
			</section>
		);
	}
}

export default inject((provider) => ({
	vehicleModelStore: new VehicleModelStore(),
	vehicleMakeStore: new VehicleMakeStore(),
}))(observer(AllVehiclesPage));
