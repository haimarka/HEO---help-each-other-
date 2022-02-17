import "./App.css";
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import LogIn from './pages/login/LogIn';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import Navigation from "./components/Navigation";
import { useTranslation } from 'react-i18next';



function App() {
  const { t, i18n } = useTranslation();
  const handleClick = (lang)=>{
    i18n.changeLanguage(lang);

  }
  return (
    <BrowserRouter>
    <div className="App">
      <button onClick={()=>handleClick('en')} > english </button>
      <button onClick={()=>handleClick('il')} > עברית </button>
      <Navigation/>
    <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/About' render={()=><About/>}/>
        <Route exact path='/LogIn' render={()=><LogIn/>}/>
        <Route exact path='/Register' render={()=><Register/>}/>
        <Route exact path='/Search' render={()=><Search/>}/>
    </Switch>
    <footer>{t('footer.1')}</footer>
    </div>
  </BrowserRouter>
  
  );
}

export default App;
