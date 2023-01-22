import React , {useState,useEffect} from "react";
import "../css/TaskSelector.css"
import RadioBox from "./RadioBox";
function RadioSelector({setState,title="",optionsList}){
    let ItemList=[]
    console.log()
    ItemList.push(<h5>{title}</h5>)
    for(let e of optionsList){
        ItemList.push(<RadioBox title={title} value={e} setState={setState}/>)
    }
    return(
        <div class={"RadioList"}>
            {ItemList}
        </div>
    );
}
export default RadioSelector