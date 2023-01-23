import React , {useState,useEffect} from "react";
import {Bar, Line} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import LineGraph from "./LineGraph";
import generateNegativeList from "../../utils/generateNegativeList";
import diffBetweenDays from "../../utils/diffBetweenDays";
import mapAllValuesEqual from "../../utils/mapAllValuesEqual";
function BarGraph({curTask,dueDates,timeframe=30}){

    let HabitInfo=undefined
    if(curTask){
        let timespan=timeframe
        if(typeof timeframe==='string') {
            timespan = diffBetweenDays(curTask.TaskChanges.get(timeframe).date)
        }
        HabitInfo=curTask.getCompleteHistory(timespan,curTask.startDate,mapAllValuesEqual(dueDates) ? curTask.dueDates:dueDates)
        console.log(HabitInfo)
    }
    console.log("On bar habit info",HabitInfo)
    return(
        <div>
            {curTask.constructor.name==="habit" &&
                <Bar data={{
                    labels: curTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Positive'],
                            data:curTask!==undefined ? HabitInfo.positiveData:[]
                        },
                        {
                            label:['Negative'],
                            data:curTask!==undefined ? generateNegativeList(HabitInfo.negativeData):[]
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
                <Bar data={{
                    labels: curTask!==undefined ? HabitInfo.days:[],
                    datasets:[
                        {
                            label:['Completed'],
                            data:curTask!==undefined ? HabitInfo.data:[]
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
    return currentTask.name +" | Since Change: "+ changeName.name +"("+changeName.date.toLocaleDateString()+")"
}
export default BarGraph