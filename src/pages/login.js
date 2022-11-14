import React , {useState} from "react";
import {useNavigate} from "react-router-dom";
import {user} from "../user";
function Login({LoginRequest,error}){
    let User = undefined;
    const[details,setDetails]=useState({username:"",password:""});
    let navigate=useNavigate();
    const submitHandler= async e=>{//This function call the login function
        e.preventDefault();//Prevent reload of the page
        console.log(details);
        User=new user(details.username,details.password)
        let response=await User.login();
        if(response){
            navigate("/menu",{state:{user:User}});
            console.log("ID FROM LOGIN",User.id,"API TOKEN FROM LOGIN",User.apiToken)
        }else{
            User=undefined
            alert("Incorrect credentials")
        }
    }
    return (
        <form onSubmit={submitHandler} >
            <div className={"form-inner"}>
                <h2>Login</h2>
                {/*ERROR*/}
                <div className={"form-group"}>
                    <label htmlFor={"name"}>Name:</label>
                    <input type={"text"} name={"username"} id={"username"} onChange={e=>setDetails({...details,username:e.target.value})}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} name={"password"} id={"password"}  onChange={e=>{setDetails({...details,password:e.target.value})} }/>
                </div>
                <input type={"submit"} value={"LOGIN"}/>
            </div>
        </form>
    )
}
export default Login;