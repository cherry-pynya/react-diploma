import { getCatrgories, PENDING, ERROR } from "../../../slices/appSlice";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CatalogNavItem from './CatalogNavItem/CatalogNavItem';
import { nanoid } from "@reduxjs/toolkit";
import PlaceHolder from "../../PlaceHolder/PlaceHolder";

export default function CatalogNav() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.app.categories.items);
  const status = useSelector((state) => state.app.categories.status);

  useEffect(() => {
    dispatch(getCatrgories());
  }, []);

  if (status === PENDING) return <PlaceHolder />;
  if (status === ERROR) return <div></div>;

  return (
    <ul className="catalog-categories nav justify-content-center">
      <CatalogNavItem item={{id: 'all', title: 'Все'}} />
      {categories.map((el) => <CatalogNavItem item={el} key={nanoid()} />)}
    </ul>
  );
}
