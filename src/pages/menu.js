import React from "react";
import "../components/css/Navbar.css"
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
export function Menu() {
    let User=recreateUser(sessionStorage.getItem("user"))
    return (
        <div className={"trends"}>
            <Navbar user={User}/>
            <h2>"Instructions"</h2>
            <p>
               The page contains three sections:
                Modify Changes:That let you add add modify(change date and name) and delete changes associated with each task.A change is a

            </p>
        </div>
    );
}
