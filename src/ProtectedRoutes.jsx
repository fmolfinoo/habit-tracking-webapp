import {Navigate, Outlet} from "react-router";

const ProtectedRoutes=()=>{
    const isAuth=sessionStorage.getItem("user")!==null;
    return isAuth ? <Outlet/> :<Navigate TO to={"/"}/>;
}

export default ProtectedRoutes