import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory, getItemsById, getAllItems } from '../../../../slices/appSlice';

export default function CatalogNavItem({ item }) {
  const dispatch = useDispatch();
  const {id, title} = item;
  const activeCategory = useSelector((state) => state.app.categories.activeCategory);

  let itemClass = 'nav-link';

  if (activeCategory === id) itemClass = 'nav-link active'

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setActiveCategory(id));
    if (id === 'all') {
        dispatch(getAllItems());
    } else {
        dispatch(getItemsById(id));
    }
  };

  return (
    <li className="nav-item">
      <a className={itemClass} href="0" onClick={handleClick}>
        {title}
      </a>
    </li>
  );
}
