import React , {useState} from "react";
import {useLocation} from "react-router";
import Navbar from "../components/Navbar";
import recreateUser from "../utils/recreateUser";
import "./css/change.css"
import getDateUtcWithoutTime from "../utils/getDateUtcWithoutTime";
import RadioSelector from "../components/forms/RadioSelector";
import mapGetTypeList from "../utils/mapGetTypeList";
import FormBox from "../components/forms/formBox";

export function CreateChange() {
    let User=recreateUser(useLocation().state.user)
    const[curTask,setTask]=useState()
    const[curDate,setCurDate]=useState(getDateUtcWithoutTime(new Date(Date.now())))
    const[curChange,setCurChange]=useState()
    const[curName,setName]=useState("")
    const setChange=(change)=>{
        setCurChange(change)
        setCurDate(getDateUtcWithoutTime(change.date))
        setName(change.name)
    }

    const createHandler=async (event) => {
        //if the name is empty we return nothing
        event.preventDefault()
        if(curName===""){
            return
        }

        curTask.addTaskChange(curName, curDate)
        //We deselect radio button and reset the curChange value after every form submission
        const radioButtons = document.querySelectorAll("input[type='radio'][name='Change']");
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
        //We change the information saved on session storage
        await User.refresh()
        setCurChange(undefined)
    }
    const deleteHandler=async (event) => {
        event.preventDefault()
        curTask.removeTaskChange(curChange.name)
        //We deselect radio button and reset the curChange value after every form submission
        const radioButtons = document.querySelectorAll("input[type='radio'][name='Change']");
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
        await User.refresh()
        setCurChange(undefined)
    }
    const modifyHandler=async (event) => {
        //if the name is empty we return nothing
        event.preventDefault()
        if(curName===""|| curName===curChange.name){
            return
        }
        curTask.modifyTaskChange(curChange, curName, curDate)
        //We deselect radio button and reset the curChange value after every form submission
        const radioButtons = document.querySelectorAll("input[type='radio'][name='Change']");
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
        await User.refresh()
        setCurChange(undefined)

    }
    return(
        <div className={"body"}>
            <Navbar user={User}/>
            <h1>On Modify Change</h1>
            <div className={"menu"}>
            <FormBox legend={"Select task:"} optionList={
                [
                    <RadioSelector key={"radio 1"} group={"task"} setState={setTask} title={"Habits"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"habit")}/>,
                    <RadioSelector key={"radio 2"} group={"task"} setState={setTask} title={"Dailies"} getName={(e)=>{ return e.name}} optionsList={mapGetTypeList(User.tasks,"daily")}/>
                ]}
            />
            {curTask!==undefined&&
                <div>
                    <FormBox legend={"Select Change for Current Task:"} optionList={
                        [
                            <RadioSelector key={"radio 3"} group={"Change"} setState={setChange} getName={()=>"Create New Change"} optionsList={[{name:"",date:new Date(Date.now()),new:true}]}/>,
                            <RadioSelector key={"radio 4"} group={"Change"} setState={setChange} title={"Modify Existing Changes:"} getName={(e)=>{ return e.name+" ("+e.date.toLocaleDateString()+")"}} optionsList={curTask.getChangesList()}/>
                        ]}
                    />
                </div>
            }
            </div>
            {curChange!==undefined&&
                <div className={"change-input"}>
                    <input type="date" value={curDate} onChange={e=>{setCurDate(e.target.value)}}/>
                    <input type="text" value={curName} onChange={e=>{setName(e.target.value)}}/>
                    {/* We check if we are on the create change option*/}
                    {curChange.new &&
                        <form onSubmit={createHandler} >
                            <input type="submit" value={"Create Change"} onSubmit={createHandler}/>
                        </form>
                    }
                    {/* We check if an existing change is selected to display to adequate options*/}
                    {curTask.TaskChanges.has(curChange.name) &&
                        <div>
                            <form onSubmit={modifyHandler} >
                                <input type="submit" value={"Modify Change"} onSubmit={modifyHandler}/>
                            </form>
                            <form onSubmit={deleteHandler} >
                               <input type="submit" value={"Delete Change"} onSubmit={deleteHandler}/>
                            </form>
                        </div>
                    }

                </div>
            }

        </div>
    );
}
