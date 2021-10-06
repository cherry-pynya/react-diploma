import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const int = useSelector((state) => state.app.cart.items.length)
  // нужно достать из стейта кол-ва товара в корзине
  // если 1 или больше то отражать сartnumber
  // по клику настроить переход в корзину
  return (
    <Link to="/cart">
      <div className="header-controls-pic header-controls-cart">
        {int >= 1 && <CartNumber int={int} />}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
}

function CartNumber({ int }) {
  return <div className="header-controls-cart-full">{int}</div>;
}
