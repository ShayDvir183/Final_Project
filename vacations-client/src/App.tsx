import React,{useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar, { IRoute, routes } from './components/ui-components/appBar';
import { getVacationsAction } from './store/asyncFunction/vacations';
import StickyFooter from './components/ui-components/footer';
import ScrollButton from './components/ui-components/toTop';
import ScrollTop from './components/ui-components/toTop';
import { Fab } from '@mui/material';
import BackToTop from './components/ui-components/toTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function App() {
  useEffect(() => {
   getVacationsAction()
  }, [])
  

  return (
    <Router>
      <div className="App">
      <NavBar/>
      <Routes>
        {routes.map((route: IRoute) => (
          <Route path={route.path} element={route.element} key={route.linkText}/>
        ))}
      </Routes>
      <div style={{display:"flex",flexDirection:"row"}}>
      <BackToTop>
      <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
      <StickyFooter/>
      </div>
    </div>
    </Router>
  );
}

export default App;