import React , {useState} from "react";

function LoginForm({Login,error}){
    const[details,setDetails]=useState({username:"",password:""});
    const submitHandler= e=>{//This function call the login function
        e.preventDefault();//Prevent reload of the page
        Login(details);
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
export default LoginForm;