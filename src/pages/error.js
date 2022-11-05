import React , {useState} from "react";
export function Error() {
    console.log("on error");
    return(
        <div className={"error"}>
        <h2>Page not Found</h2>
        </div>
    );
}
export default  Error();