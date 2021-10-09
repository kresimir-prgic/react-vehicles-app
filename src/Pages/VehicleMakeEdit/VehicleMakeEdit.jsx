import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import VehicleMakeEditStore from "./VehicleMakeEditStore";
import classes from "./VehicleMakeEdit.module.css";

class VehicleMakeEdit extends Component {
	id = null;

	constructor(props) {
		super(props);
		this.id = props.match.params.id;
		// console.log(this.id);
		this.props.vehicleMakeEditStore.getModelData(this.id);
	}

	render() {
		return (
			<section>
				<h1>Edit make</h1>
				{this.props.vehicleMakeEditStore.isLoading && <h3>Loading...</h3>}
				{!this.props.vehicleMakeEditStore.isLoading && 
					<div>
						<div className={classes.wrapper}>
							<input
								type="text"
								className={classes.input}
								placeholder="Make name"
								value={this.props.vehicleMakeEditStore.name}
								onChange={(event) =>
									this.props.vehicleMakeEditStore.changeNameHandler(event)
								}
							/>
							<input
								type="text"
								className={classes.input}
								placeholder="Make Abrv"
								value={this.props.vehicleMakeEditStore.abrv}
								onChange={(event) =>
									this.props.vehicleMakeEditStore.changeAbrvHandler(event)
								}
							/>
						</div>
            {!this.props.vehicleMakeEditStore.isValid && <p className={classes.notValid}>Empty field is not allowed!</p>}
						<button
							className={classes.btn}
							onClick={(id) =>
								this.props.vehicleMakeEditStore.updateMake(this.id)
							}
						>
							Save
						</button>
						<button
							className={`${classes.btn} ${classes.btnDelete}`}
							onClick={(id) =>
								this.props.vehicleMakeEditStore.deleteMake(this.id)
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
	vehicleMakeEditStore: new VehicleMakeEditStore(),
}))(observer(VehicleMakeEdit));
