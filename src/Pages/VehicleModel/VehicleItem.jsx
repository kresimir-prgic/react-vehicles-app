import classes from './VehicleItem.module.css';

function VehicleItem(props) {
  return (
    <li className={classes['vehicle-item']} onClick={props.editModel}>
      <h3 className={classes['vehicle-title']} title="Click to edit">{props.abrv} <span>{props.name}</span></h3>
    </li>
  );
}

export default VehicleItem;