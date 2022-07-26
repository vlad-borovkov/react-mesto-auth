import React from "react";
import { Link } from 'react-router-dom';

const EntryUserForm = (props) => {

  return (
    <div
      className={`entry-user entry-user_type_${props.name} ${props.isOpen ? "entry-user_on" : ""}`}
    >
      <div className="entry-user__container-form">
        <form
          onSubmit={props.onSubmit}
          className="entry-user__form"
          name={`${props.name}-user`}
        >
          <h2 className="entry-user__container-form-title">{props.title}</h2>
          {props.children}
          <button
            className="entry-user__container-form-submit-button"
            type="submit"
            value={`${props.buttonOnText}`}
          >
            {`${props.buttonOnText}`}
          </button>
          
        </form>
        
        <p className={`entry-user_login-reminder ${props.isLoginOpen ? "entry-user__login-reminder_off" : ""}`}>
          Уже зарегистрированы?   <Link to="/sign-in" className="entry-user__login-reminder-link">
          Войти
          </Link>
        </p>

      </div>
    </div>
  );
};
export default EntryUserForm;
