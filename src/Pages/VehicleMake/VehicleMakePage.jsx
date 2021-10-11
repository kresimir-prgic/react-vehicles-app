import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import VehicleMakeStore from "./VehicleMakeStore";
import ItemList from "../../Components/ItemList";
import VehicleMakeForm from "./VehicleMakeForm";
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
        {this.props.vehicleMakeStore.formVisible && (
					<VehicleMakeForm
						changeName={(event) =>
							this.props.vehicleMakeStore.changeNameHandler(event)
						}
						changeAbrv={(event) =>
							this.props.vehicleMakeStore.changeAbrvHandler(event)
						}
						onSubmit={(event) =>
							this.props.vehicleMakeStore.addNewMake(event)
						}
						submitMessage={this.props.vehicleMakeStore.formMessage}
						isValid={this.props.vehicleMakeStore.formIsValid}
					/>
				)}
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
					<ItemList
						dataSource={this.props.vehicleMakeStore.filteredVehicleMake}
						editItem={this.props.vehicleMakeStore.editMake}
            pageCount={this.props.vehicleMakeStore.totalPages}
            onPageChange={this.props.vehicleMakeStore.pageChangeHandler}
            forcePage={this.props.vehicleMakeStore.currentPage - 1}
					/>
				)}
			</section>
		);
	}
}

export default inject((provider) => ({
	vehicleMakeStore: new VehicleMakeStore(),
}))(observer(VehicleMakePage));
