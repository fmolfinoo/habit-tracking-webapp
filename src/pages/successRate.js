import React , {useState,useEffect} from "react";
import "./css/styles.css"
import "./css/table.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import DailiesTable from "../components/DailiesTable";
import HabitsTable from "../components/HabitsTable";
console.log("on Trends");
export function SuccessRate() {
    console.log("Uselocation",useLocation().state)
    let User=recreateUser(useLocation().state.user)
    return (
        <div >
            <Navbar user={User}/>
            <h2>On Success Rate</h2>
            <h2>"Welcome {User.username}"</h2>
            <h2>Dailies Information</h2>
            <DailiesTable user={User}/>
            <h2>Habits Information</h2>
            <HabitsTable user={User}/>
        </div>
    );
}
