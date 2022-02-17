import "./App.css";
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import NeedHelp from "./pages/needHelp/NeedHelp";
import WantToVolunteer from "./pages/wantToVolunteer/WantToVolunteer";
import Navigation from "./components/navigation/Navigation";
import { useState } from "react";

function App() {
const [auth,setAuth]=useState(null);
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation/>
    <Switch> 
        <Route exact path='/' component={Home}/>
        <Route exact path='/About' render={()=><About/>}/>
        <Route exact path='/NeedHelp' render={()=><NeedHelp/>}/>
        <Route exact path='/WantToVolunteer' render={()=><WantToVolunteer  setAuth={setAuth}/>}/>
    </Switch>
    <footer>Free To Help 2022 &copy;</footer>
    </div>
  </BrowserRouter>
  
  );
}

export default App;
