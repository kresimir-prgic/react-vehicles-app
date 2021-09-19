import classes from './VehicleItem.module.css';

function VehicleItem(props) {
  return (
    <li className={classes['vehicle-item']}>
      <h3 className={classes['vehicle-title']}>{props.abrv} {props.name}</h3>
    </li>
  );
}

export default VehicleItem;