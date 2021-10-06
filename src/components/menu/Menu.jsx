import CartIcon from './CartIcon';
import SearchIcon from './SearchIcon'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/header-logo.png';
import { useState } from 'react';
import HeaderInput from './HeaderInput';

export default function Menu() {
    const [searchActive, setSearchActive] = useState(false);

    const clickSearch = () => {
        setSearchActive(!searchActive);
    }

    // сделать элемент для поиска
    return(
        <header className='container'>
            <div className='row'>
                <div className='col'>
                    <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                        <Link className='navbar-brand' to='/'>
                            <img src={logo} alt="Bosa Noga" />
                        </Link>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>Главная</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/catalog'>Каталог</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/about'>О магазине</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/contacts'>Контакты</Link>
                                </li>
                            </ul>
                            <div>
                                <div className='header-controls-pics'>
                                    <SearchIcon click={clickSearch} />
                                    <CartIcon />
                                </div>
                                {searchActive && <HeaderInput clickSearch={clickSearch} />}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
