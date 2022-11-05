import {Component, useState} from "react";
import Login from "./pages/login";
import LoginRequest from "./utils/loginRequest";

function App() {
    console.log("error");
    return (
        <div className={"App"}>
            <Login LoginRequest={LoginRequest} error={"g"}/>
        </div>
    );
}


export default App;
