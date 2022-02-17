import { Link } from 'react-router-dom';
import React from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function Navigation({ auth, setAuth }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const handleClickLang = (lang)=>{
    i18n.changeLanguage(lang);

  }
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src="https://i.ibb.co/KmpTG7h/Free-To-Help.png" />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/WantToVolunteer"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Want To Volunteer?
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/NeedHelp"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Need Help?
              </NavLink>
            </li>
            <li>  {auth ? <button onClick={() => {
              setAuth(null)
              localStorage.removeItem("user")
            }}>logout</button> : null}</li>

            <li><button onClick={()=>handleClick('en')} > english </button></li>
            <li><button onClick={()=>handleClick('il')} > עברית </button></li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>



          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
