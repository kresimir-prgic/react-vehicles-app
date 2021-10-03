import classes from "./VehicleModelForm.module.css";

const VehicleModelForm = (props) => {
	return (
		<form className={classes.formWrapper} onSubmit={props.onSubmit}>
			<select className={classes.input} onChange={props.selectHandler}>
				<option value="">Select make</option>
				{props.vehicleMakeData.map((make) => (
					<option key={make.id} value={make.id}>
						{make.name}
					</option>
				))}
			</select>
			<input
				className={classes.input}
				type="text"
				placeholder="Name"
				onChange={props.changeName}
			/>
			<button className={classes.formButton}>Add model</button>
			<span className={props.isValid ? classes.valid : classes.notValid}>
				{props.submitMessage}
			</span>
		</form>
	);
};

export default VehicleModelForm;
