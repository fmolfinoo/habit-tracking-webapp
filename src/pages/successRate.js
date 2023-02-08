import React from "react";
import "./css/table.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import DailiesTable from "../components/Data Display/DailiesTable";
import HabitsTable from "../components/Data Display/HabitsTable";
export function SuccessRate() {
    let User=recreateUser(useLocation().state.user)
    return (
        <div >
            <Navbar user={User}/>
            <h1>On Success Rate</h1>
            <h2>Dailies Information</h2>
            <DailiesTable user={User}/>
            <h2>Habits Information</h2>
            <HabitsTable user={User}/>
        </div>
    );
}
