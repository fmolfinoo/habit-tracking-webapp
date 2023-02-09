import React from "react";
import "./css/menu.css"
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
export function Menu() {
    let User=recreateUser(sessionStorage.getItem("user"))
    return (
        <div>
            <Navbar user={User}/>
            <div className={"description"}>
                <h1>Instructions:</h1>
                <h2>Modify Changes</h2>
                <p >The Modify Changes section allows users to add, modify, or delete changes made to the task.</p>
                <h2>Trends</h2>
                <p>The Trends section provides a visual representation of the task's performance using bar graphs, raw data line graphs, and moving average line graphs. The moving average line graph displays the average performance from the start of the selected timeframe to the current point in the graph. The available timeframes for the graph include the last 7, 14, 30, 90, 180, and 360 days, as well as the date of a change.</p>
                <h2>Success Rate</h2>
                <p>The Success Rate section shows charts displaying the day of creation, number of days since creation, and the average success rate for the selected task over the last 7, 14, 30, 90, 180, and 360 days, and since creation.</p>
                <h2>Refresh Button</h2>
                <p >Refreshes Habit data from the server.</p>
                <p> <b> Note: If the task was created after the start of the selected timeframe, the performance for that timeframe will only reflect the performance since creation.</b></p>
            </div>
        </div>
    );
}
