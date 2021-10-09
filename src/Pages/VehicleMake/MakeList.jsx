import ItemList from "../../Components/ItemList";

function MakeList(props) {
	return (
		<ItemList>
			{props.make.map((make) => (
				<li
					key={make.id}
					id={make.id}
					name={make.name}
					abrv={make.abrv}
					onClick={() => props.editMake(make.id)}
				>
					<h3 title="Click to edit">
						{make.abrv} <span>{make.name}</span>
					</h3>
				</li>
			))}
		</ItemList>
	);
}

export default MakeList;
