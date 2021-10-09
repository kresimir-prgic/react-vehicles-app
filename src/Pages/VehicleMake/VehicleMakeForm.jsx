import classes from "./VehicleMakeForm.module.css";

const VehicleMakeForm = (props) => {
	return (
		<form className={classes.formWrapper} onSubmit={props.onSubmit}>
			<input
				className={classes.input}
				type="text"
				placeholder="Name"
				onChange={props.changeName}
			/>
			<input
				className={classes.input}
				type="text"
				placeholder="Abrv"
				onChange={props.changeAbrv}
			/>
			<button className={classes.formButton}>Add make</button>
			<span className={props.isValid ? classes.valid : classes.notValid}>
				{props.submitMessage}
			</span>
		</form>
	);
};

export default VehicleMakeForm;
