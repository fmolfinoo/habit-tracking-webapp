import { Link, Outlet } from "react-router-dom";
import React,{useState} from "react";


class Home extends React.Component{

    render(){
        return (
        <body>
        <h1>Centralize habit tracker</h1>
        <p></p>
        <form action={console.log("hola")}>
            <label htmlFor="fname">Habitica Username:</label>
            <br/>
            <input type="text" id="fname" name="fname" value=""/>
            <br/>
            <label htmlFor="lname">Habitica Password:</label>
            <br/>
            <input type="text" id="lname" name="lname" value=""/>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        </body>)
    };
}
export default Home;