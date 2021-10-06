import { Link } from "react-router-dom";
import priceConvert from '../../../Utils/priceConvert/priceConvert';
import Img from "../../Img/Img";

export default function ItemPreview({ item, catalog }) {
  // нужно настроить роутинг на страницу товара по ссылке
  const { images, price, title, id } = item;
  const style = {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  }
  return (
    <div className="col-4">
      <div className={catalog ? 'card catalog-item-card'
      : 'card'} 
          style={{minHeight: '99%', justifyContent: 'flex-end'}}>
          <div style={style}>
            <Img url={images} alt={title} className={'card-img-top img-fluid'} />
          </div>
        <div className="card-body" style={{flex: '0 0 auto'}}>
          <p className="card-text">{title}</p>
          <p className="card-text">{`${priceConvert(price)} руб.`}</p>
          <Link to={`/catalog/:${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}
