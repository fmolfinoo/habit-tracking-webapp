import React , {useState} from "react";
import {useLocation} from "react-router";
console.log("on Menu");
export function Menu() {
    const User=useLocation().state.user
    console.log(User)
    return(<div className={"menu"}>
        <h2>Welcome {User.username}</h2>
    </div>);
}
