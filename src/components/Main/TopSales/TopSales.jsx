import PlaceHolder from "../../PlaceHolder/PlaceHolder";
import { ERROR, getTopSales, PENDING, IDLE  } from "../../../slices/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import Wrong from "../../Wrong/Wrong";
import ItemPreview from "../../Catalog/ItemPreview/ItemPreview";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

export default function TopSales() {
  const [catalog, setCatalog] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.app.topSales.items);
  const status = useSelector((state) => state.app.topSales.status);

  useEffect(() => {
    dispatch(getTopSales());
  }, []);

  let element;

  if (status === PENDING) element = <PlaceHolder />;
  if (status === ERROR) element = <Wrong />;
  if (status === IDLE) element = (
      <div className='row'>
          {items.map((el) => <ItemPreview item={el} key={nanoid()} catalog={catalog} />)}
      </div>
  );

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {element}
    </section>
  );
}
