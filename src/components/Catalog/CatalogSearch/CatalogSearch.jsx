import { useSelector, useDispatch } from "react-redux";
import { input, setActiveCategory, searchItem, IDLE, upOffset } from "../../../slices/appSlice";
import { useHistory } from "react-router";

export default function CatalogSearch() {
  const dispatch = useDispatch();
  const itmesStatus = useSelector((state) => state.app.catalogItems.status);
  const offset = useSelector((state) => state.app.loadMore.offset);
  const history = useHistory();

  const value = useSelector((state) => state.app.search.searchField);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(input(value));
    dispatch(setActiveCategory('all'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(offset)
    dispatch(searchItem({value, offset}));
    dispatch(upOffset());
  }

  if (itmesStatus === IDLE && history.location.pathname === '/catalog') return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input className="form-control" placeholder="Поиск" name='search' value={value} onChange={handleChange} />
    </form>
  );

  return (
      <div></div>
  );
}
