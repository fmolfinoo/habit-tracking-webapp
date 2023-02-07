import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function Navbar(state) {
    return <nav className={"nav"}>
        <ul>
            <li><Link to={"/SuccessRate"} state={state}>Success Rate</Link></li>
            <li><Link to={"/calendar"}  state={state}>Calendar</Link></li>
            <li><Link to={"/trends"} state={state}>Trends</Link></li>
        </ul>
    </nav>
}
