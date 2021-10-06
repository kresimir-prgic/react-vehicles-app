import classes from './ItemList.module.css';

function ItemList(props) {
	return (
		<ul className={classes['item-list']}>
      {props.children}
    </ul>
	);
}

export default ItemList;
