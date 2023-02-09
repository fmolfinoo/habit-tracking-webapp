import Login from "./pages/login";
import {Helmet} from "react-helmet";
import React from "react";

function App() {
    return (
        <div className={"App"}>
            <Helmet>
                <link rel="icon" type="image/png" href="../public/black_teal_hat_outline.png"/>
            </Helmet>
            <Login />
        </div>
    );
}


export default App;
