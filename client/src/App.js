
import {useEffect} from "react"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import LogIn from './pages/login/LogIn';
import Register from './pages/register/Register';
import Navigation from "./components/Navigation";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

  
  function App() {
  const [auth,setAuth] = useState(null);

useEffect(() => {
 const getAuthFromLocalStorage = localStorage.getItem("user")
 if(getAuthFromLocalStorage){
  setAuth(getAuthFromLocalStorage)
 }
}, []);


  const { t, i18n } = useTranslation();
  const handleClick = (lang)=>{
    i18n.changeLanguage(lang);
  }
  return (
    <BrowserRouter>
    <div className="App">
      <button onClick={()=>handleClick('en')} > english </button>
      <button onClick={()=>handleClick('il')} > עברית </button>
      <Navigation auth={auth} setAuth={setAuth} />
    <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/About' render={()=><About/>}/>
        <Route exact path='/LogIn' render={()=><LogIn auth={auth} setAuth={setAuth} />}/>
        <Route exact path='/Register' render={()=><Register auth={auth} setAuth={setAuth}/>}/>
    </Switch>
    <footer>{t('footer.1')}</footer>
    </div>
  </BrowserRouter>
  
  );
}

export default App;
