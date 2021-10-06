import { useSelector, useDispatch } from "react-redux";
import {
  ERROR,
  getMoreItemsById,
  getMoreItms,
  PENDING,
  upOffset,
  searchItem,
} from "../../../slices/appSlice";
import PlaceHolder from "../../PlaceHolder/PlaceHolder";

export default function CatalogLoadMore() {
  const dispatch = useDispatch();
  const categoryId = useSelector(
    (state) => state.app.categories.activeCategory
  );
  const status = useSelector((state) => state.app.loadMore.status);
  const isOver = useSelector((state) => state.app.loadMore.isOver);
  const itemsStatus = useSelector((state) => state.app.catalogItems.status);
  const offset = useSelector((state) => state.app.loadMore.offset);
  const value = useSelector((state) => state.app.search.searchField);

  const handleClick = () => {
    if (value !== "") {
      dispatch(searchItem({value, offset}));
    } else {
      if (categoryId === "all") {
        dispatch(getMoreItms(offset));
      } else {
        dispatch(getMoreItemsById({ categoryId, offset }));
      }
    }
    dispatch(upOffset());
  };

  let element = (
    <button className="btn btn-outline-primary" onClick={handleClick}>
      Загрузить ещё
    </button>
  );

  if (status === PENDING) element = <PlaceHolder />;

  if (isOver || itemsStatus === PENDING || itemsStatus === ERROR) return <div></div>;

  return <div className="text-center">{element}</div>;
}
