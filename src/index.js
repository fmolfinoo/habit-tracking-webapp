import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Menu} from "./pages/menu";
import {CreateChange} from "./pages/change";
import {Error} from "./pages/error";
import reportWebVitals from './reportWebVitals';
import {HashRouter, Routes,Route} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes"
import {Trends} from "./pages/trends";
import {SuccessRate} from "./pages/successRate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path={"/"} element={<App/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path={"/menu"} element={<Menu/>}/>
                  <Route path={"/SuccessRate"} element={<SuccessRate/>}/>
                  <Route path={"/change"} element={<CreateChange/>}/>
                  <Route path={"/trends"} element={<Trends/>}/>
                  <Route path={"*"} element={<Error/>}/>
              </Route>
          </Routes>
      </HashRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
