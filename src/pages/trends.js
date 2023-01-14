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
import LineGraph from "../components/LineGraph";
console.log("on Trends");
export function Trends() {
    console.log("Uselocation",useLocation().state)
    let User=recreateUser(useLocation().state.user)
    //var curTask=document.querySelector('input[name="task"]:checked');
    const[curTask,setTask]=useState("")
    const[curGraph,setGraph]=useState("")
    const[curTimeframe,setTimeframe]=useState({element:30})
    const[curDueDates,setDueDates]=useState()
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
            {curTask!=="" &&
                <FormBox legend={"Select the type of bar graph to display"} optionList={
                    [
                        <RadioSelector setState={setGraph} optionsList={["Bar","Line(Moving Average)","Line(Raw Data)"]}/>,
                    ]}
                />
            }
            {curTask!=="" && curGraph!=="" &&curTask.type==="Habits" &&
                <FormBox legend={"Select timeframe to display"} optionList={
                    [
                        <RadioSelector setState={setTimeframe} title={"In days:"} optionsList={[7,14,30,90,180,360]}/>,
                        <RadioSelector setState={setTimeframe} title={"Since change:"} optionsList={User.habits.get(curTask.element).getChangesList()}/>
                    ]}
                />
            }
            {curTask!=="" && curGraph!=="" &&curTask.type==="Dailies" &&
                <FormBox legend={"Select timeframe to display"} optionList={
                    [
                        <RadioSelector setState={setTimeframe} title={"In days:"} optionsList={[7,14,30,90,180,360]}/>,
                        <RadioSelector setState={setTimeframe} title={"Since change:"} optionsList={User.dailies.get(curTask.element).getChangesList()}/>
                    ]}
                />
            }
            {curGraph.element==="Bar" && <BarGraph curTask={curTask} user={User} timeframe={curTimeframe}/>}
            {curGraph.element==="Line(Moving Average)" && <LineGraph curTask={curTask} user={User} movingAverage={true} timeframe={curTimeframe}/>}
            {curGraph.element==="Line(Raw Data)" && <LineGraph curTask={curTask} user={User} movingAverage={false} timeframe={curTimeframe}/>}
        </div>
    );
}
