import {Link} from "react-router-dom";
import './css/Navbar.css'
export default function Navbar({user}) {
    const reset=async () => {
        alert("Refreshing Data")
        await user.refresh();
        window.location.reload(true)
    }
    return <nav className={"nav"}>

        <ul>
            <li><button className="reset" onClick={reset}>Refresh Data</button></li>
            <li><Link to={"/change"}  state={user}>Modify Changes</Link></li>
            <li><Link to={"/trends"} state={user}>Trends</Link></li>
            <li><Link to={"/SuccessRate"} state={user}>Success Rate</Link></li>
        </ul>
    </nav>
}
