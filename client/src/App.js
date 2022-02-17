
import {useEffect} from "react"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import NeedHelp from "./pages/needHelp/NeedHelp";
import WantToVolunteer from "./pages/wantToVolunteer/WantToVolunteer";
import Navigation from "./components/navigation/Navigation";
import { useState } from "react";


  
  function App() {
  const [auth,setAuth] = useState(null);

useEffect(() => {
 const getAuthFromLocalStorage = localStorage.getItem("user")
 if(getAuthFromLocalStorage){
  setAuth(getAuthFromLocalStorage)
 }
}, []);


  
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation auth={auth} setAuth={setAuth} />
    <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/About' render={()=><About/>}/>
        <Route exact path='/NeedHelp' render={()=><NeedHelp/>}/>
        <Route exact path='/WantToVolunteer' render={()=><WantToVolunteer auth={auth}  setAuth={setAuth}/>}/>
    </Switch>
    <footer>"Free To Help 2022 &copy;"</footer>
    </div>
  </BrowserRouter>
  
  );
}

export default App;
