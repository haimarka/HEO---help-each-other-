import "./App.css";
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import LogIn from './pages/login/LogIn';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import Navigation from "./components/Navigation";

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation/>
      {/* <h1 onClick={async()=>{
        await axios.get('/click');
      }}>Hello Team Winners For Ever!!!1</h1> */}
    <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/About' render={()=><About/>}/>
        <Route exact path='/LogIn' render={()=><LogIn/>}/>
        <Route exact path='/Register' render={()=><Register/>}/>
        <Route exact path='/Search' render={()=><Search/>}/>
    </Switch>
    <footer>Free To Help 2022 &copy;</footer>
    </div>
  </BrowserRouter>
  
  );
}

export default App;
