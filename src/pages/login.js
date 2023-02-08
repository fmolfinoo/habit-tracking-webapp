import React , {useState} from "react";
import {useNavigate} from "react-router-dom";
import {user} from "../user";
import "../pages/css/login.css"

function Login(){
    let User = undefined;
    const[details,setDetails]=useState({username:"",password:""});
    let navigate=useNavigate();
    const submitHandler= async e=>{//This function call the login function
        e.preventDefault();//Prevent reload of the page
        User=new user(details.username,details.password)
        let response=await User.login();
        if(response){
            let fetchData=await User.getTasksData()
            if(fetchData){
                window.sessionStorage.setItem("user",JSON.stringify(User))
                User.processTaskData(User.data)
                navigate("/menu",{state:{user:User}});
            }
            else{//If we failed to fetch the data
                alert("Server Communication Error:Failed to fetch user Data")
            }
        }else {//if we failed to login
            User=undefined
            alert("Incorrect credentials")
        }
    }
    return (
        <form onSubmit={submitHandler} >
            <h1>Habitica Habit Tracker Tool</h1>
            <div className={"form-inner"}>
                <h2>Login</h2>
                {/*ERROR*/}
                <div className={"form-group"}>
                    <label htmlFor={"name"}>Name:</label>
                    <input className={"text-input"} type={"text"} name={"username"} id={"username"} onChange={e=>setDetails({...details,username:e.target.value})}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input className={"text-input"} type={"password"} name={"password"} id={"password"}  onChange={e=>{setDetails({...details,password:e.target.value})} }/>
                </div>
                <input className={"button"} type={"submit"} value={"LOGIN"}/>
            </div>
        </form>
    )
}
export default Login;