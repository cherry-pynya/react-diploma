import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { resetCart, postItems } from "../../../slices/appSlice";

export default function CartForm() {
    const items = useSelector((state) => state.app.cart.items);

    const dispatch = useDispatch();

    const history = useHistory();

    const initial = {
        phone: '',
        address: '',
        agreement: false,
    };

    const [form, setForm] = useState(initial);

    const change = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({...form, [name]: value});
    };

    const submitForm = (e) => {
        e.preventDefault();
        const { phone, address, agreement } = form;
        if (!agreement || phone === '' || address === '') return;
        setForm(initial);
        dispatch(postItems({form, items}));
        history.push('/orderStatus')
    };

    return(
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
              <form className="card-body" onSubmit={submitForm}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    name="phone"
                    type="number"
                    input={form.phone}
                    placeholder="Ваш телефон"
                    onChange={change}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    name="address"
                    input={form.address}
                    onChange={change}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    onChange={change}
                    name="agreement"
                    checked={form.agreement}
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">
                  Оформить
                </button>
              </form>
            </div>
          </section>
    );
}