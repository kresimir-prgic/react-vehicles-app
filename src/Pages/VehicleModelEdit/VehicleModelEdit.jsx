import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import VehicleModelEditStore from "./VehicleModelEditStore";
import classes from "./VehicleModelEdit.module.css";

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
			<section>
				<h1>Edit model</h1>
				{this.props.vehicleModelEditStore.isLoading && <h3>Loading...</h3>}
				{!this.props.vehicleModelEditStore.isLoading && 
					<div>
						<div className={classes.wrapper}>
							<select
								className={classes.input}
								value={this.props.vehicleModelEditStore.selected}
								onChange={(event) =>
									this.props.vehicleModelEditStore.selectHandler(event)
								}
							>
								{this.props.vehicleModelEditStore.makeData.map((make) => (
									<option key={make.id} value={make.id}>
										{make.name}
									</option>
								))}
							</select>
							<input
								type="text"
								className={classes.input}
								placeholder="Model name"
								value={this.props.vehicleModelEditStore.name}
								onChange={(event) =>
									this.props.vehicleModelEditStore.changeNameHandler(event)
								}
							/>
						</div>
            {!this.props.vehicleModelEditStore.isValid && <p className={classes.notValid}>Empty field is not allowed!</p>}
						<button
							className={classes.btn}
							onClick={(id) =>
								this.props.vehicleModelEditStore.updateModel(this.id)
							}
						>
							Save
						</button>
						<button
							className={`${classes.btn} ${classes.btnDelete}`}
							onClick={(id) =>
								this.props.vehicleModelEditStore.deleteModel(this.id)
							}
						>
							Delete
						</button>
					</div>
				}
			</section>
		);
	}
}

export default inject((provider) => ({
	vehicleModelEditStore: new VehicleModelEditStore(),
}))(observer(VehicleModelEdit));
