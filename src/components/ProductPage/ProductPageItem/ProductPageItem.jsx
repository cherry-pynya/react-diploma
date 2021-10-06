import { useDispatch } from "react-redux";
import QuantityButton from "./QuantityButton/QuantityButton";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { addToCart } from "../../../slices/appSlice";

export default function ProductPageItem({item}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const { title, images, sku, manufacturer, color, material, season, reason, price, sizes } = item;

  const pickQuantity = (int) => {
    setQuantity(int);
  };

  const awalibleSizes = sizes.filter((el) => el.avalible === true);

  const addItemToCart = () => {
      console.log(item, size, quantity)
      if (size !== null && (quantity > 0 && quantity <= 10)) {
        dispatch(addToCart({item, size, quantity}))
      }
  };

  const sizeClick = (e) => {
    e.target.classList.toggle('selected');
    setSize(e.target.textContent);
  };

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={images[0]}
            className="img-fluid"
            alt={title}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{reason}</td>
              </tr>
              <tr>
                <td>Цена</td>
                <td>{`${price} руб.`}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:{" "}
              {awalibleSizes.map((el) => {
                  return (
                    <span className='catalog-item-size' onClick={sizeClick} style={{cursor: 'pointer'}} key={nanoid}>
                        {el.size}
                    </span>
                  );
              })}
            </p>
            <p>
              Количество:{" "}
              <QuantityButton pick={pickQuantity} />
            </p>
          </div>
          <button className="btn btn-danger btn-block btn-lg" onClick={addItemToCart}>В корзину</button>
        </div>
      </div>
    </section>
  );
}
