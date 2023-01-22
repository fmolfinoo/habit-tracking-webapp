import React , {useState,useEffect} from "react";
import "../css/TaskSelector.css"
import CheckBox from "./CheckBox";
function CheckBoxSelector({title="",optionsList,curState,setState}){
    let CheckList=[]
    CheckList.push(<h5>{title}</h5>)
    for(let e of optionsList){
        CheckList.push(<CheckBox value={e} curState={curState} setState={setState}/>)
    }
    return(
        <div class={"CheckList"}>
            {CheckList}
        </div>
    );
}
export default CheckBoxSelector