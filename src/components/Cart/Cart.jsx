import Baner from "../Baner/Baner";
import CartTable from "./CartTable/CartTable";
import CartForm from "./CartForm/CartForm";

export default function Cart() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Baner />
          <CartTable />
          <CartForm />
        </div>
      </div>
    </main>
  );
}
