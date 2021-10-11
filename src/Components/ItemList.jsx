import classes from './ItemList.module.css';
import ReactPaginate from 'react-paginate';

function ItemList(props) {
	return (
    <div>
      <ul className={classes['item-list']}>
        {props.dataSource.map((item) => (
          <li
            key={item.id}
            id={item.id}
            name={item.name}
            abrv={item.abrv}
            onClick={() => props.editItem(item.id)}
          >
            <h3 title="Click to edit">
              {item.abrv} <span>{item.name}</span>
            </h3>
          </li>
        ))}
      </ul>
      {props.pageCount > 1 && (
        <ReactPaginate 
          pageCount={props.pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={props.onPageChange}
          forcePage={props.forcePage}
          previousLabel='Prev'
          nextLabel='Next'
          containerClassName='pagination'
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          activeLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          disabledClassName="page-item disabled"
        />
      )}
    </div>
	);
}

export default ItemList;
