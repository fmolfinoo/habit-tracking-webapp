import React from "react";
function CheckBox({value,curState,setState}){
    const onSelect=(value)=>{
        curState.set(value,!curState.get(value))
        setState(new Map(curState))
    }
    return(
        <div class={"TaskItem"}>
            <input type={"checkbox"} onChange={()=>onSelect(value)}/>
            <label>{value}</label>
        </div>
    )
}
export default CheckBox