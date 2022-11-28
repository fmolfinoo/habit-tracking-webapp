import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Menu} from "./pages/menu";
import {Calendar} from "./pages/calendar";
import {Error} from "./pages/error";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes"
import {Trends} from "./pages/trends";
import {SuccessRate} from "./pages/successRate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path={"/menu"} element={<Menu/>}/>
                  <Route path={"/SuccessRate"} element={<SuccessRate/>}/>
                  <Route path={"/calendar"} element={<Calendar/>}/>
                  <Route path={"/trends"} element={<Trends/>}/>
                  <Route path={"*"} element={<Error/>}/>
              </Route>
          </Routes>
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
