import Baner from "../Baner/Baner";
import { useSelector } from "react-redux";
import { IDLE, ERROR } from "../../slices/appSlice";
import PlaceHolder from "../PlaceHolder/PlaceHolder";

export default function OrderStatus() {
  const status = useSelector((state) => state.app.cart.status);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Baner />
          <section className="top-sales">
            {status === IDLE ? <h2 className="text-center">Ваш заказ успешно зарегистрирован!</h2>
            : status === ERROR  ? <h2 className="text-center">Что-то пошло не так!</h2> 
            : <PlaceHolder />}
          </section>
        </div>
      </div>
    </main>
  );
}