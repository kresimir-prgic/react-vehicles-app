import classes from './ItemList.module.css';

function ItemList() {
	return (
		<ul className={classes['item-list']}>
      {/* {props.vehicles.map(vehicle => (
        <VehicleItem key={vehicle.id} id={vehicle.id} makeId={vehicle.makeId} name={vehicle.name} abrv={vehicle.abrv} />
      ))} */}
    </ul>
	);
}

export default ItemList;
