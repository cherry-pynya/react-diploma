import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { useHistory } from "react-router";
import Baner from "../Baner/Baner";
import { ERROR, getItemById, PENDING } from '../../slices/appSlice';
import getId from "./getId";
import PlaceHolder from "../PlaceHolder/PlaceHolder";
import Wrong from "../Wrong/Wrong";
import ProductPageItem from "./ProductPageItem/ProductPageItem";

export default function ProductPage() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.app.selectedItem.item);
  const history = useHistory();
  const id = getId(history.location.pathname);
  const status = useSelector((state) => state.app.selectedItem.status);

  useEffect(() => {
    dispatch(getItemById(id));
  }, []);

  let element = <ProductPageItem item={item} />;

  if (status === PENDING) element = <PlaceHolder />;
  if (status === ERROR) element = <Wrong />;

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Baner />
          {element}
        </div>
      </div>
    </main>
  );
}
