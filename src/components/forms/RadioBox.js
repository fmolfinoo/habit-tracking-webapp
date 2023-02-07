import React from "react";

function RadioBox({name,value,setState,group}){
    const onSelect=(value)=>{
        console.log(name,value)
        setState(value)
    }
    return(
        <div class={"TaskItem"}>
            <input type={"radio"} name={group} onChange={()=>onSelect(value)}/>
            <label>{name}</label>
        </div>
    )
}
export default RadioBox