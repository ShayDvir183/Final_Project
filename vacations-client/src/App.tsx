import React from 'react';
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
interface IRoute {
  path: string;
  element: any;
  linkText: string;
  invisible?: boolean;
}
const routes: Array<IRoute> = [
  {
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
  return (
    <BrowserRouter>
      <div className="App">
        {routes.filter((route: IRoute) => !route.invisible)
          .map((route: IRoute) => (
            <span className={css.route}>
              <Link to={route.path}>{route.linkText}</Link>
            </span>
          ))}
      </div>

      <Routes>
        {routes.map((route: IRoute) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
      <MyModal  />

    </BrowserRouter>

  );
}

export default App;
