import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import VehicleModelStore from "./VehicleModelStore";
import VehicleList from "./VehicleList";
import VehicleModelForm from "./VehicleModelForm";
import classes from "./AllVehicles.module.css";

class AllVehiclesPage extends Component {
	render() {
		return (
			<section>
				<div>
					Not on the list? &nbsp;
					<a
						href="#0"
						onClick={(event) =>
							this.props.vehicleModelStore.newFormHandler(event)
						}
					>
						{this.props.vehicleModelStore.formVisible ? "Hide form" : "Add new"}
					</a>
				</div>
				{this.props.vehicleModelStore.formVisible && (
					<VehicleModelForm
						selectHandler={(event) =>
							this.props.vehicleModelStore.newFormSelectHandler(event)
						}
						vehicleMakeData={this.props.vehicleModelStore.vehicleMakeData}
						changeName={(event) =>
							this.props.vehicleModelStore.changeNameHandler(event)
						}
						onSubmit={(event) =>
							this.props.vehicleModelStore.addNewModel(event)
						}
						submitMessage={this.props.vehicleModelStore.formMessage}
						isValid={this.props.vehicleModelStore.formIsValid}
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
						{this.props.vehicleModelStore.vehicleMakeData.map((make) => (
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
            editModel={this.props.vehicleModelStore.editModel}
          />
				)}
        {!this.props.vehicleModelStore.isLoading && !this.props.vehicleModelStore.filteredVehicleModels.length && 
          <h3>No results!</h3>
        }
			</section>
		);
	}
}

export default inject((provider) => ({
	vehicleModelStore: new VehicleModelStore(),
}))(observer(AllVehiclesPage));
