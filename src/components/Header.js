import logoPath from "./../images/logo.svg";
import React from "react";
import { Link, withRouter, NavLink } from 'react-router-dom';

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
          <p className="header__user-email">{props.onLogin}</p>
          {/* прописать логику, прокинуть через глобальный стейт - 
          если не зареганый пользователь, зарегистрироваться */}
          <button className="header__sign-in-button">
          <Link to="/sign-up">
            Войти
          </Link>
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
