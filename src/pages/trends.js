import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import RadioSelector from "../components/RadioSelector";
import BarGraph from "../components/BarGraph";
import {user} from "../user";
import FormBox from "../components/formBox";
import RadioBox from "../components/forms/RadioBox";
console.log("on Trends");
export function Trends() {
    console.log("Uselocation",useLocation().state)
    let User=recreateUser(useLocation().state.user)
    //var curTask=document.querySelector('input[name="task"]:checked');
    const[curTask,setTask]=useState("")
    const[curGraph,setGraph]=useState("")
    const getNames=(list)=>{
        let accumulator=[]
        for(let e of list){
            accumulator.push(e.name)
        }
        return accumulator
    }
    return (
        <div className={"menu"}>
            <Navbar user={User}/>
            <h2>On Trends</h2>
            <h2>"Welcome {User.username}"</h2>
            <FormBox legend={"Select the task to display:"} optionList={
                [
                    <RadioSelector setState={setTask} title={"Habits"} optionsList={getNames(User.habits.values())}/>,
                    <RadioSelector setState={setTask} title={"Dailies"} optionsList={getNames(User.dailies.values())}/>
                ]}
            />
            {curTask!==undefined &&
                <FormBox legend={"Select the type of bar graph to display"} optionList={
                    [
                        <RadioSelector setState={setGraph} optionsList={["bar","Lines"]}/>,
                    ]}
                />
            }
            <BarGraph curTask={curTask} user={User} graph={curGraph}/>
        </div>
    );
}
