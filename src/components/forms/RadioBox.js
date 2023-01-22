import React from "react";

function RadioBox({name,value,setState}){
    const onSelect=(value)=>{
        console.log(name,value)
        setState(value)
    }
    return(
        <div class={"TaskItem"}>
            <input type={"radio"} name="task" onChange={()=>onSelect(value)}/>
            <label>{name}</label>
        </div>
    )
}
export default RadioBox