import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import RadioSelector from "../components/forms/RadioSelector";
import BarGraph from "../components/Data Display/BarGraph";
import {user} from "../user";
import FormBox from "../components/forms/formBox";
import RadioBox from "../components/forms/RadioBox";
import LineGraph from "../components/Data Display/LineGraph";
import CheckBoxSelector from "../components/forms/CheckBoxSelector";
import mapGetTypeList from "../utils/mapGetTypeList";
console.log("on Trends");
export function Trends() {
    console.log("Uselocation",useLocation().state)
    let User=recreateUser(useLocation().state.user)
    const[curTask,setTask]=useState(undefined)
    const[curGraph,setGraph]=useState("")
    const[curTimeframe,setTimeframe]=useState(30)
    const[curDueDates,setDueDates]=useState(new Map(Object.entries({"m": false, "t": false, "w": false, "th": false, "f": false, "s": false, "su": false})))
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
                    <RadioSelector setState={setTask} title={"Habits"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"habit")}/>,
                    <RadioSelector setState={setTask} title={"Dailies"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"daily")}/>
                ]}
            />
            {curTask!==undefined &&
                <FormBox legend={"Select the type of bar graph to display"} optionList={
                    [
                        <RadioSelector setState={setGraph} optionsList={["Bar","Line(Moving Average)","Line(Raw Data)"]}/>,
                    ]}
                />
            }
            {curTask!==undefined && curGraph!=="" &&
                <div>
                    <FormBox legend={"Select timeframe to display"} optionList={
                        [
                            <RadioSelector setState={setTimeframe} title={"In days:"} optionsList={[7,14,30,90,180,360]}/>,
                            <RadioSelector setState={setTimeframe} getName={(e)=>{ return e.name+" ("+e.date.toLocaleDateString()+")"}} title={"Since change:"} optionsList={curTask.getChangesList()}/>
                        ]}
                    />
                    <FormBox legend={"Select Days to display"} optionList={
                    [
                    <CheckBoxSelector curState={curDueDates} setState={setDueDates} optionsList={["m", "t", "w", "th", "f", "s", "su"]}/>,
                    ]}
                    />
                </div>
            }
            {curGraph==="Bar" && <BarGraph curTask={curTask} timeframe={curTimeframe} dueDates={curDueDates}/>}
            {curGraph==="Line(Moving Average)" && <LineGraph curTask={curTask} movingAverage={true} timeframe={curTimeframe} dueDates={curDueDates}/>}
            {curGraph==="Line(Raw Data)" && <LineGraph curTask={curTask} movingAverage={false} timeframe={curTimeframe} dueDates={curDueDates}/>}
        </div>
    );
}
