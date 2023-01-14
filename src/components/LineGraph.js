import React , {useState,useEffect} from "react";
import {Line} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import generateMovingAverageList from "../utils/generateMovingAverageList";
import generateNegativeList from "../utils/generateNegativeList";
import diffBetweenDays from "../utils/diffBetweenDays";
function LineGraph({curTask,user,movingAverage=false,timeframe=30}){
    let currentTask=undefined
    let HabitInfo=undefined
    if(curTask!==null&&curTask.element!==undefined){
        if(curTask.type==="Habits"){
            currentTask=user.habits.get(curTask.element)
            if(typeof timeframe.element==='string'){
                timeframe.element=diffBetweenDays(currentTask.TaskChanges.get(timeframe.element).date)
            }
            HabitInfo=currentTask.getCompleteHistory(timeframe.element,currentTask.startDate)
        }else if(curTask.type==="Dailies"){
            currentTask=user.dailies.get(curTask.element)
            if(typeof timeframe.element==='string'){
                timeframe.element=diffBetweenDays(currentTask.TaskChanges.get(timeframe.element).date)
            }
            HabitInfo=currentTask.getCompleteHistory(timeframe.element,currentTask.startDate)
        }
    }
    return(
        <div>
            {curTask.type==="Habits" &&
                <Line data={{
                    labels: currentTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Positive'],
                            data:movingAverage ? generateMovingAverageList(HabitInfo.positiveData):HabitInfo.positiveData
                        },
                        {
                            label:['Negative'],
                            data:movingAverage ? generateNegativeList(generateMovingAverageList(HabitInfo.negativeData)):generateNegativeList(HabitInfo.negativeData)
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
            {curTask.type==="Dailies" &&
                <Line data={{
                    labels: currentTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Completed'],
                            data:movingAverage ? generateMovingAverageList(HabitInfo.data):HabitInfo.data
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
export default LineGraph