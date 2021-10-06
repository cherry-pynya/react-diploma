import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import priceConvert from "../../../Utils/priceConvert/priceConvert";
import { nanoid } from "@reduxjs/toolkit";
import { removeFromCart } from "../../../slices/appSlice";

export default function CartTable() {
  const dispatch = useDispatch();
  const [sum, setSum] = useState(0)
  const items = useSelector((state) => state.app.cart.items);
  
  const reSum = () => {
    let int = 0;
    items.forEach((el) => {
        int += el.item.price;
    });
    setSum(int);
  };

  useEffect(() => {
    reSum();
  }, [sum]);

  const deleteItem = (e) => {
    const { id, dataset } = e.target;
    const { size } = dataset;
    dispatch(removeFromCart({id, size}));
    setSum(0);
  }

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el) => {
            return (
              <tr key={nanoid}>
                <th scope="row">{items.indexOf(el) + 1}</th>
                <td>
                  <Link to="/products/1.html">{el.item.title}</Link>
                </td>
                <td>{el.size}</td>
                <td>{el.quantity}</td>
                <td>{priceConvert(el.item.price) + ' руб.'}</td>
                <td>{priceConvert(el.item.price * el.quantity) + ' руб.'}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" id={el.item.id} data-size={el.size} onClick={deleteItem}>Удалить</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>{sum + ' руб'}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
