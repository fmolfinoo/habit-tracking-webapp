import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import {useNavigate} from "react-router-dom";
export function Calendar() {
    let User=recreateUser(useLocation().state.user)
    return(
        <div className={"calendar"}>
            <Navbar user={User}/>
            <h2>On calendar</h2>
            <h2>"Welcome {User.username}"</h2>
        </div>
    );
}
