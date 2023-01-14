import React from "react";

function CheckBox({title,value,setState}){
    const onSelect=(value)=>{
        setState({type:title,element:value})
    }
    return(
        <div class={"TaskItem"}>
            <input type={"checkbox"} name="task" onChange={()=>onSelect(value)}/>
            <label>{value}</label>
        </div>
    )
}
export default CheckBox