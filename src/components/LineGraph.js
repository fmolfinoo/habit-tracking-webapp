import React , {useState,useEffect} from "react";
import {Line} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import generateMovingAverageList from "../utils/generateMovingAverageList";
import generateNegativeList from "../utils/generateNegativeList";
import diffBetweenDays from "../utils/diffBetweenDays";
import mapAllValuesEqual from "../utils/mapAllValuesEqual";

function LineGraph({curTask,movingAverage=false,dueDates,timeframe=30}){
    let currentTask=undefined
    let HabitInfo=undefined
    if(curTask){
        if(typeof timeframe==='string'){
            timeframe=diffBetweenDays(curTask.TaskChanges.get(timeframe).date)
        }
        //We check if dueDates has any date activated if not we use default days
        HabitInfo=curTask.getCompleteHistory(timeframe,curTask.startDate,mapAllValuesEqual(dueDates) ?curTask.dueDates:dueDates )
    }
    return(
        <div>
            {curTask.constructor.name==="habit" &&
                <Line data={{
                    labels: curTask!==undefined ? HabitInfo.days:[],
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
                                 text: typeof timeframe==='number' ? curTask.name +"| For the last "+timeframe+" days":getTitleForChange(curTask,timeframe)
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
            {curTask.constructor.name==="daily" &&
                <Line data={{
                    labels: curTask!==undefined ? HabitInfo.days:[],
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
                                 text: typeof timeframe==='number' ? curTask.name +"| For the last "+timeframe+" days":getTitleForChange(curTask,timeframe)
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
    console.log("changename",changeName)
    return currentTask.name +" | Since Change: "+ changeName.name +"("+changeName.date.toLocaleDateString()+")"
}
export default LineGraph