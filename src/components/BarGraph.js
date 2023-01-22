import React , {useState,useEffect} from "react";
import {Bar, Line} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import LineGraph from "./LineGraph";
import generateNegativeList from "../utils/generateNegativeList";
import diffBetweenDays from "../utils/diffBetweenDays";
import mapAllValuesEqual from "../utils/mapAllValuesEqual";
function BarGraph({curTask,user,dueDates,timeframe={element:90}}){
    let currentTask=undefined
    let HabitInfo=undefined
    if(curTask!==null&&curTask.element!==undefined){
        let timespan=timeframe.element
        if(curTask.type==="Habits"){
            currentTask=user.habits.get(curTask.element)
            if(typeof timeframe.element==='string'){
                timespan=diffBetweenDays(currentTask.TaskChanges.get(timeframe.element).date)
            }
            HabitInfo=currentTask.getCompleteHistory(timespan,currentTask.startDate,mapAllValuesEqual(dueDates) ?currentTask.dueDates:dueDates)
        }else if(curTask.type==="Dailies"){
            currentTask=user.dailies.get(curTask.element)
            if(typeof timeframe.element==='string'){
                timespan=diffBetweenDays(currentTask.TaskChanges.get(timeframe.element).date)
            }
            HabitInfo=currentTask.getCompleteHistory(timespan,currentTask.startDate,mapAllValuesEqual(dueDates) ?currentTask.dueDates:dueDates)
        }
    }
    return(
        <div>
            {curTask.type==="Habits" &&
                <Bar data={{
                    labels: currentTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Positive'],
                            data:currentTask!==undefined ? HabitInfo.positiveData:[]
                        },
                        {
                            label:['Negative'],
                            data:currentTask!==undefined ? generateNegativeList(HabitInfo.negativeData):[]
                        }
                    ]
                }}
                     height={400}
                     width={600}
                     options={{
                         plugins: {
                             title: {
                                 display: true,
                                 text: typeof timeframe.element==='string' ? getTitleForChange(currentTask,timeframe.element): curTask.element +"| For the last "+timeframe.element+" days"
                             },
                         },
                         responsive:true,
                         maintainAspectRatio: false,
                         scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                }}
        />}
            {curTask.type==="Dailies" &&
                <Bar data={{
                    labels: currentTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Completed'],
                            data:currentTask!==undefined ? HabitInfo.data:[]
                        }
                    ]
                }}
                     height={400}
                     width={600}
                     options={{
                         plugins: {
                             title: {
                                 display: true,
                                 text: typeof timeframe.element==='string' ? getTitleForChange(currentTask,timeframe.element) : curTask.element +"| For the last "+timeframe.element+" days"
                             },
                         },
                         responsive:true,
                         maintainAspectRatio: false,
                         scales: {
                             x: {
                                 stacked: true,
                             },
                             y: {
                                 stacked: true
                             }
                         }
                     }}
                />}
        </div>
    );
}
function getTitleForChange(currentTask,changeName){
    return currentTask.name +" | Since Change: "+ changeName +"("+currentTask.TaskChanges.get(changeName).date.toLocaleDateString()+")"
}
export default BarGraph