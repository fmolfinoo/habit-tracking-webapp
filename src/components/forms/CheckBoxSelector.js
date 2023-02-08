import React  from "react";
import "../css/TaskSelector.css"
import CheckBox from "./CheckBox";
function CheckBoxSelector({title="",optionsList,curState,setState}){
    let CheckList=[]
    CheckList.push(<h5>{title}</h5>)
    for(let e of optionsList){
        CheckList.push(<CheckBox key={e} value={e} curState={curState} setState={setState}/>)
    }
    return(
        <div className={"CheckList"}>
            {CheckList}
        </div>
    );
}
export default CheckBoxSelector