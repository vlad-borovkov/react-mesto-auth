import logoPath from "./../images/logo.svg";
import React from "react";
import { Link, Route } from "react-router-dom";


function Header(props) {

  return (
    <div className="page">
      <header className="header">
        <img
          className="header__group-logo"
          src={logoPath}
          alt="логотип сайта место"
        />
        <nav className="header__menu">
          <Route exact path="/">
            <p className="header__user-email">{props.emailRender}</p>
            <Link to="/sign-in" onClick={props.onLogOut} className="header__sign-in-up-button_logout">Выйти</Link>
          </Route>
          <Route path="/sign-in">
              <Link to="/sign-up" className="header__sign-in-up-button">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
              <Link to="/sign-in" className="header__sign-in-up-button">Войти</Link>
          </Route>
        </nav>
      </header>
    </div>
  );
}

export default Header;
