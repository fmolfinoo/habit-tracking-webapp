import React , {render,useState} from "react";
import "./css/trends.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import RadioSelector from "../components/forms/RadioSelector";
import BarGraph from "../components/Data Display/BarGraph";
import FormBox from "../components/forms/formBox";
import LineGraph from "../components/Data Display/LineGraph";
import CheckBoxSelector from "../components/forms/CheckBoxSelector";
import mapGetTypeList from "../utils/mapGetTypeList";
import {daily, habit} from "../task";
//Used for type comparison
const tempDaily=new daily("test",undefined,"1234", {},"",[],"2022-10-30");
const tempHabit=new habit("test",undefined,"1234","",[],"2022-10-30");
export function Trends() {
    let User=recreateUser(useLocation().state.user)

    const[curTask,setTask]=useState(undefined)
    const[curGraph,setGraph]=useState("")
    const[curTimeframe,setTimeframe]=useState(30)
    const[curDueDates,setDueDates]=useState(new Map(Object.entries({"m": false, "t": false, "w": false, "th": false, "f": false, "s": false, "su": false})))

    return (
        <div className={"body"}>
            <Navbar user={User}/>
            <h1>On Trends</h1>
            <div className={"menu"}>
                <FormBox legend={"Select the task to display:"} optionList={
                    [
                        <RadioSelector key={"radio-menu 1"} setState={setTask} title={"Habits"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,tempHabit)}/>,
                        <RadioSelector key={"radio-menu 2"}  setState={setTask} title={"Dailies"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,tempDaily)}/>
                    ]}
                />
                {curTask!==undefined &&
                    <FormBox legend={"Select the type of bar graph to display"} optionList={
                        [
                            <RadioSelector key={"radio-menu 3"} setState={setGraph} optionsList={["Bar","Line(Moving Average)","Line(Raw Data)"]}/>,
                        ]}
                    />
                }
                {curTask!==undefined && curGraph!=="" &&
                    <div className={"menu"}>
                        <FormBox legend={"Select timeframe to display"} optionList={
                            [
                                <RadioSelector key={"radio-graph 1"} setState={setTimeframe} title={"In days:"} optionsList={[7,14,30,90,180,360]}/>,
                                <RadioSelector key={"radio-graph 2"} setState={setTimeframe} getName={(e)=>{ return e.name+" ("+e.date.toLocaleDateString()+")"}} title={"Since change:"} optionsList={curTask.getChangesList()}/>
                            ]}
                        />
                        <FormBox legend={"Select Days to display"} optionList={
                        [
                        <CheckBoxSelector key={"box 1"} curState={curDueDates} setState={setDueDates} optionsList={["m", "t", "w", "th", "f", "s", "su"]}/>,
                        ]}
                        />
                    </div>
                }
            </div>
            {curGraph==="Bar" && <BarGraph curTask={curTask} timeframe={curTimeframe} dueDates={curDueDates}/>}
            {curGraph==="Line(Moving Average)" && <LineGraph curTask={curTask} movingAverage={true} timeframe={curTimeframe} dueDates={curDueDates}/>}
            {curGraph==="Line(Raw Data)" && <LineGraph curTask={curTask} movingAverage={false} timeframe={curTimeframe} dueDates={curDueDates}/>}
        </div>
    );
}
