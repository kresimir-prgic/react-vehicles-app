import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import VehicleMakeStore from "./VehicleMakeStore";
import MakeList from "./MakeList";
import classes from "./VehicleMakePage.module.css";

class VehicleMakePage extends Component {
	render() {
		return (
			<section>
        <div>
					Not on the list? &nbsp;
					<a
						href="#0"
						onClick={(event) =>
							this.props.vehicleMakeStore.newFormHandler(event)
						}
					>
						{this.props.vehicleMakeStore.formVisible ? 'Hide form' : 'Add new'}
					</a>
				</div>
        <div className={classes["page-header"]}>
					<h1>Vehicle Make List</h1>
					<select
						className={classes.input}
						onChange={(event) =>
							this.props.vehicleMakeStore.selectHandler(event)
						}
					>
						<option value="">All</option>
						{this.props.vehicleMakeStore.selectMakeData.map((make) => (
							<option key={make.id} value={make.id}>
								{make.name}
							</option>
						))}
					</select>
					<input
						className={classes.input}
						type="text"
						placeholder="Search..."
						value={this.props.vehicleMakeStore.filter}
						onChange={(event) =>
							this.props.vehicleMakeStore.filterHandler(event)
						}
					/>
				</div>
				{this.props.vehicleMakeStore.isLoading && <h3>Loading...</h3>}
				{!this.props.vehicleMakeStore.isLoading && (
					<MakeList
						make={this.props.vehicleMakeStore.filteredVehicleMake}
						// editModel={this.props.vehicleModelStore.editModel}
					/>
				)}
			</section>
		);
	}
}

export default inject((provider) => ({
	vehicleMakeStore: new VehicleMakeStore(),
}))(observer(VehicleMakePage));
