import { useSelector, useDispatch } from "react-redux";
import { input, setActiveCategory, searchItem, upOffset } from "../../slices/appSlice";
import { useHistory } from "react-router-dom";

export default function HeaderInput({ clickSearch }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const value = useSelector((state) => state.app.search.searchField);
  const offset = useSelector((state) => state.app.loadMore.offset);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(input(value));
  };

  const handleSubmit = (e) => {
    dispatch(setActiveCategory('all'));
    e.preventDefault();
    if (value === '') {
        clickSearch();
        return false;
    };
    dispatch(searchItem({value, offset}));
    dispatch(upOffset());
    history.push('/catalog');
  };

  return (
    <form
      data-id="search-form"
      className="header-controls-search-form form-inline"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        name="search"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}
