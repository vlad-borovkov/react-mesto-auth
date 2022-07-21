import logoPath from "./../images/logo.svg";
import React from "react";
import { NavLink } from "react-router-dom";

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
          <p className="header__user-email">my-email@laika.com</p>
          {/* прописать логику, прокинуть через глобальный стейт - 
          если не зареганый пользователь, зарегистрироваться */}
          <button className="header__sign-in-button">Войти</button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
