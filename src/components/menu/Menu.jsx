import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';

export default function Menu() {
    // сделать элемент для поиска
    return(
        <header className='container'>
            <div className='row'>
                <div className='col'>
                    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                        <Link className='navbar-brand' to='/'>
                            <img src="../assets/img/header-logo.png" alt="Bosa Noga" />
                        </Link>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>Главная</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>Каталог</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>О магазине</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>Контакты</Link>
                                </li>
                            </ul>
                            <div>
                                <div className='header-controls-pics'>
                                    <div className='header-controls-pic header-controls-search' data-id='search-expander'></div>
                                    <CartIcon />
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
