import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import VehicleModelEditStore from "./VehicleModelEditStore";
// import classes from "./VehicleModelEdit.module.css";

class VehicleModelEdit extends Component {
	id = null;

	constructor(props) {
		super(props);
		this.id = props.match.params.id;
		// console.log(this.id);
    this.props.vehicleModelEditStore.getModelData(this.id);
	}

	render() {
		return (
			<div>
				Edit Model Page
				<p>Vehicle Model Id: {this.id}</p>
        <button onClick={(id) => this.props.vehicleModelEditStore.deleteModel(this.id)}>Delete</button>
			</div>
		);
	}
}

export default inject((provider) => ({
	vehicleModelEditStore: new VehicleModelEditStore()
}))(observer(VehicleModelEdit));
