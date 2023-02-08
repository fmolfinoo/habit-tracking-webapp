import React  from "react";
import "../css/TaskSelector.css"
import RadioBox from "./RadioBox";
function RadioSelector({setState,optionsList,title,getName=(e)=>{return e},group="default"}){
    let ItemList=[]
    ItemList.push(<h3 key={title+group}>{title}</h3>)
    for(let e of optionsList){
        ItemList.push(<RadioBox key={getName(e)} name={getName(e)} value={e} setState={setState} group={group} />)
    }
    return(
        <div key={title} className={"RadioList"}>
            {ItemList}
        </div>
    );
}
export default RadioSelector