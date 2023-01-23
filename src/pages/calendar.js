import React , {useState,useEffect} from "react";
import "./css/styles.css"
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import {useNavigate} from "react-router-dom";
import Calendar from "react-calendar";
import "./css/calendar.css"
import getDateUtcWithoutTime from "../utils/getDateUtcWithoutTime";
import RadioSelector from "../components/forms/RadioSelector";
import mapGetTypeList from "../utils/mapGetTypeList";
import FormBox from "../components/forms/formBox";
import CheckBoxSelector from "../components/forms/CheckBoxSelector";
export function CreateChange() {
    let User=recreateUser(useLocation().state.user)
    const[curTask,setTask]=useState()
    const[date,setDate]=useState(getDateUtcWithoutTime(new Date(Date.now())))
    const[curChange,setCurChange]=useState()
    const[curName,setName]=useState("")
    const setChange=(change)=>{
        setCurChange(change)
        setDate(getDateUtcWithoutTime(change.date))
        setName(change.name)

    }
    const submitHandler=()=>{

    }
    return(
        <form onSubmit={submitHandler} >
            <Navbar user={User}/>
            <FormBox legend={"Select task:"} optionList={
                [
                    <RadioSelector setState={setTask} title={"Habits"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"habit")}/>,
                    <RadioSelector setState={setTask} title={"Dailies"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"daily")}/>
                ]}
            />
            {curTask!==undefined&&
                <div>
                    <FormBox legend={"Select Change for Current Task:"} optionList={
                        [
                            <RadioSelector setState={setChange} getName={()=>"Create New Change"} optionsList={[{name:"",date:new Date(Date.now())}]}/>,
                            <RadioSelector setState={setChange} title={"Modify Existing Changes"} getName={(e)=>{ return e.name+" ("+e.date.toLocaleDateString()+")"}} optionsList={curTask.getChangesList()}/>
                        ]}
                    />
                </div>
            }
            {curChange!==undefined&&
                <div>
                    <input type="date" value={date} onChange={e=>{setDate(e.target.value)}}/>
                    <input type="text" value={curName} onChange={e=>{setName(e.target.value)}}/>
                    <input type="submit" value={"Set Change"} onSubmit={submitHandler}/>
                </div>
            }
            <h2>On calendar</h2>
            <h2>"Welcome {User.username}"</h2>
        </form>
    );
}
