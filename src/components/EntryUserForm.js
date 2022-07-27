import React from "react";
import { Link, Route } from 'react-router-dom';

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
        <Route path="/sign-up">
        <p className="entry-user_login-reminder">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="entry-user__login-reminder-link">
          Войти
          </Link>
        </p>
        </Route>
      </div>
    </div>
  );
};
export default EntryUserForm;
