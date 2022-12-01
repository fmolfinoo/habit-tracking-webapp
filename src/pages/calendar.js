import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import {useNavigate} from "react-router-dom";
import Calendar from "react-calendar";
import "./css/calendar.css"
export function Calendar_page() {
    const[date,setDate]=useState(new Date())
    const onChange=date=>{
        setDate(date)
    }
    let User=recreateUser(useLocation().state.user)
    return(
        <div className={"calendar"}>
            <Navbar user={User}/>
            <Calendar onChange={onChange} value={date} selectRange={true}/>
            <h2>On calendar</h2>
            <h2>"Welcome {User.username}"</h2>
        </div>
    );
}
