import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ERROR, getAllItems, PENDING } from '../../../slices/appSlice';
import PlaceHolder from "../../PlaceHolder/PlaceHolder";
import Wrong from "../../Wrong/Wrong";
import ItemPreview from "../ItemPreview/ItemPreview";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

export default function CatalogItems() {
    const [catalog, setCatalog] = useState(true); 
    const dispatch = useDispatch();
    const items = useSelector((state) => state.app.catalogItems.items);
    const status = useSelector((state) => state.app.catalogItems.status);
    const id = useSelector((state) => state.app.categories.activeCategory);
    const categoryStatus = useSelector((state) => state.app.categories.status);

    useEffect(() => {
        if (id === 'all') {
            dispatch(getAllItems())
        } else {

        }
    }, [])

    let element = items.map((el) => <ItemPreview item={el} key={nanoid()} catalog={catalog} />)

    if (status === PENDING) element = <PlaceHolder />;
    if (status === ERROR) element = <Wrong />
    if (categoryStatus === PENDING || categoryStatus === ERROR) element = <div></div>

    return (
        <div className='row'>
            {element}
        </div>
    );
}