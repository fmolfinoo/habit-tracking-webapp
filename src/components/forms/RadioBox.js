import React from "react";

function RadioBox({name,value,setState,group}){
    const onSelect=(value)=>{
        setState(value)
    }
    return(
        <div key={name} className={"TaskItem"}>
            <input type={"radio"} name={group} onChange={()=>onSelect(value)}/>
            <label>{name}</label>
        </div>
    )
}
export default RadioBox