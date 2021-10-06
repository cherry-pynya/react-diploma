import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Menu from './components/menu/Menu';
import Footer from './components/Footer/Footer';
import NoMatch from "./components/NoMatch/NoMatch";
import Main from './components/Main/Main';
import About from "./components/About/About";
import Contacts from "./components/Contacts/Contacts";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import { getCartFromStorage } from "./Utils/StorageManager/StorageManager";
import { initStorage } from './slices/appSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const arr = getCartFromStorage();
    dispatch(initStorage(arr))
  }, []);

  return (
    <Router>
      <div className="App">
        <Menu />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/catalog/:id'>
              <ProductPage />
            </Route>
            <Route path='/catalog'>
              <CatalogPage />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contacts'>
              <Contacts />
            </Route>
            <Route path='/orderStatus'>
              <OrderStatus />
            </Route>
            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
