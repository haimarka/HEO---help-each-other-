import "./App.css";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NeedHelp from "./pages/needHelp/NeedHelp";
import WantToVolunteer from "./pages/wantToVolunteer/WantToVolunteer";
import Navigation from "./components/navigation/Navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Search from "./pages/search/Search";

function App() {
  const [auth, setAuth] = useState(null);
  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <button onClick={() => handleClick("en")}> english </button>
        <button onClick={() => handleClick("il")}> עברית </button>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/About" render={() => <About />} />
          <Route exact path="/NeedHelp" render={() => <NeedHelp />} />
          <Route
            exact
            path="/WantToVolunteer"
            render={() => <WantToVolunteer setAuth={setAuth} />}
          />
          <Route exact path="/search" render={() => <Search />} />
        </Switch>
        <footer>{t("footer.1")}</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
