import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import recreateUser from "../utils/recreateUser";

export default function Navbar(state,user) {
    const navigate = useNavigate();
    let User=recreateUser(sessionStorage.getItem("user"))
    const reset=async () => {
        alert("Refreshing Data")
        await User.refresh();
        //reload page
        //navigate(0)
    }
    return <nav className={"nav"}>

        <ul>
            <li><button className="reset" onClick={reset}>Refresh Data</button></li>
            <li><Link to={"/SuccessRate"} state={state}>Success Rate</Link></li>
            <li><Link to={"/calendar"}  state={state}>Calendar</Link></li>
            <li><Link to={"/trends"} state={state}>Trends</Link></li>
        </ul>
    </nav>
}
