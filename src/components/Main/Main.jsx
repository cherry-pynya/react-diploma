import Catalog from '../Catalog/Catalog';
import TopSales from './TopSales/TopSales';
import Baner from '../Baner/Baner';

export default function Main(props) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Baner />

          <TopSales />

          <Catalog />

        </div>
      </div>
    </main>
  );
}
