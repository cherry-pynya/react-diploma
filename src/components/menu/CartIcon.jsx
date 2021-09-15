import { Link } from "react-router-dom";

export default function CartIcon() {
  // нужно достать из стейта кол-ва товара в корзине
  // если 1 или больше то отражать сartnumber
  // по клику настроить переход в корзину
  const a = 2;
  return (
    <Link to="/">
      <div className="header-controls-pic header-controls-cart">
        {a >= 1 && <CartNumber int={a} />}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
}

function CartNumber({ int }) {
  return <div className="header-controls-cart-full">{int}</div>;
}
