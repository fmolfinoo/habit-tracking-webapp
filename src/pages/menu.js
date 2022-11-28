import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import {useNavigate} from "react-router-dom";
console.log("on Menu");
export function Menu() {
    let User=recreateUser(useLocation().state.user)
    return (
        <div className={"trends"}>
            <Navbar user={User}/>
            <h2>"Welcome {User.username}"</h2>
        </div>
    );
}
