import React, { useEffect } from 'react';
import logo from './logo.svg';
import css from "./app.module.css";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import LoginPage from './components/pages/login';
import RegisterPage from './components/pages/register';
import Vacations from './components/pages/vacations';
import MyModal from './components/ui-components/modal';
import HomePage from './components/pages/homepage';
import { getTokenLS, clearToken_RoleLS } from './store/ls';
import { useAppDispatch } from './store/hooks';
import { logOut } from './store/reducers/authReducer';
import { logOutAction } from './store/asyncFunction/login';
interface IRoute {
  path: string;
  element: any;
  linkText: string;
  invisible?: boolean;
}
let vacationsVisibility = false;
const routes: Array<IRoute> = [
  {
    path: "/",
    element: <HomePage />,
    linkText: "HomePage",
    invisible: false,
  }, {
    path: "/login",
    element: <LoginPage />,
    linkText: "Login",
    invisible: false,
  }, {
    path: "/register",
    element: <RegisterPage />,
    linkText: "Register",
    invisible: false,
  }, {
    path: "/vacations",
    element: <Vacations />,
    linkText: "Vacations",
    invisible: false,
  },
]

function App() {
  const token = getTokenLS();
  useEffect(() => {
    !token ? routes[3].invisible = true : routes[3].invisible = false;
  }, [routes[3].invisible])
  // make it better
  useEffect(() => {
    !token ? routes[3].invisible = true : routes[3].invisible = false;
  }, [token])
  function logoutHandler() {
    console.log(`inside logout`)
    if (!token) return
    logOutAction(token)
    return alert(`You are logged out`)
  }

  return (
    <BrowserRouter>
      <div className="App">
        {routes.filter((route: IRoute) => !route.invisible)
          .map((route: IRoute) => (
            <span className={css.route}>
              <Link to={route.path}>{route.linkText}</Link>
            </span>
          ))}
        {/* @ts-ignore */}
        <button onClick={logoutHandler}>logout</button>
      </div>

      <Routes>
        {routes.map((route: IRoute) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
      <MyModal />

    </BrowserRouter>

  );
}

export default App;
