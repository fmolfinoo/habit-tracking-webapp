import React from "react";

function RadioBox({title,value,setState}){
    const onSelect=(value)=>{
        setState({type:title,element:value})
    }
    return(
        <div class={"TaskItem"}>
            <input type={"radio"} name="task" onChange={()=>onSelect(value)}/>
            <label>{value}</label>
        </div>
    )
}
export default RadioBox