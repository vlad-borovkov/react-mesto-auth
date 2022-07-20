import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';

import Header from './components/Header';
import "./index.css";





function handlerSubmitRegister(registerValue) {
  console.log(registerValue)
}

// const handleRegisterOpen = () => {
//   setRegister(!isRegisterOpen);
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>

    <BrowserRouter> 
        <Header/> 
      <Switch>
          
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/sign-up">
          <Register
          onUpdater={handlerSubmitRegister}
          isOpen={false}
          />
        </Route>
        <Route path="/sign-in">
          <Login/>
        </Route>
   
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
