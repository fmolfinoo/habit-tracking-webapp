import React , {useState,useEffect} from "react";
import "../css/TaskSelector.css"
import RadioBox from "./RadioBox";
function RadioSelector({setState,optionsList,title,getName=(e)=>{return e},group="default"}){
    let ItemList=[]
    ItemList.push(<h5>{title}</h5>)
    for(let e of optionsList){
        ItemList.push(<RadioBox name={getName(e)} value={e} setState={setState} group={group} />)
    }
    return(
        <div class={"RadioList"}>
            {ItemList}
        </div>
    );
}
export default RadioSelector