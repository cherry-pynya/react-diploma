import { BrowserRouter as Router } from "react-router-dom"
import Menu from './components/menu/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
      </div>
    </Router>
  );
}

export default App;
