import {Component, useState} from "react";
import Home from "./pages/home";
import LoginForm from "./components/LoginForm";

class NewComponent extends Component {
  render() {
    return <h1>hola</h1>;
  }
}

function App() {
  const AdminUser={
    username:"user",
    password:"pass"
  }
  const[user,setUser]=useState({username:"",password:""});
  const [error,setError]=useState("");
  const Login=details=>{
    console.log(details);
    if(details.username===AdminUser.username && details.password===AdminUser.password){
      console.log("login")

    }else{
      console.log("error")
      console.log(AdminUser)
      console.log(details)
    }
  }
  const Logout=()=>{
    console.log("logout")
  }
  return (
    <div className={"App"}>
      {(user.username!=="") ? (
          <div className={"welcome"}>
            <h2>Welcome,<span>{user.name}</span></h2>
            <button>Logout</button>
          </div>
      ) :
        (
            <LoginForm Login={Login} error={error}/>)}
    </div>
  );
}

export default App;
