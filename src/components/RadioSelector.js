import React , {useState,useEffect} from "react";
import "./css/TaskSelector.css"
import RadioBox from "./forms/RadioBox";
function RadioSelector({setState,title="",optionsList}){
    let TaskList=[]
    console.log()
    TaskList.push(<h5>{title}</h5>)
    for(let e of optionsList){
        TaskList.push(<RadioBox title={title} value={e} setState={setState}/>)
    }
    return(
        <div class={"TaskList"}>
            {TaskList}
        </div>
    );
}
export default RadioSelector