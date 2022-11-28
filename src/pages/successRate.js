import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import {useNavigate} from "react-router-dom";
console.log("on Trends");
export function SuccessRate() {
    console.log("Uselocation",useLocation().state)
    let User=recreateUser(useLocation().state.user)
    return (
        <div className={"menu"}>
            <Navbar user={User}/>
            <h2>On Success Rate</h2>
            <h2>"Welcome {User.username}"</h2>
        </div>
    );
}
