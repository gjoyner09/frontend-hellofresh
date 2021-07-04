import './App.css';
import { Home } from './components/Home'
import { Menus } from './components/Menus'
import { Recipes } from './components/Recipes'
import { Navbar } from './components/Navbar'
import { Menu } from './components/Menu'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar/>

      <Switch>
        <Route path="/menus">
          <Menus />
        </Route>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/menu/:id" render={(props) => <Menu {...props} />} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
