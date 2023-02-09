import React from "react";
import {Bar} from "react-chartjs-2";
import generateNegativeList from "../../utils/generateNegativeList";
import diffBetweenDays from "../../utils/diffBetweenDays";
import mapAllValuesEqual from "../../utils/mapAllValuesEqual";
import {text} from "react-table/src/filterTypes";
import {daily, habit} from "../../task";
const tempDaily=new daily("test",undefined,"1234", {},"",[],"2022-10-30");
const tempHabit=new habit("test",undefined,"1234","",[],"2022-10-30");
function BarGraph({curTask,dueDates,timeframe=30}){
    let HabitInfo=undefined
    if(curTask && timeframe){
        let timespan=timeframe
        if(typeof timeframe!=='number') {
            timespan = diffBetweenDays(timeframe.date)
        }
        HabitInfo=curTask.getCompleteHistory(timespan,curTask.startDate,mapAllValuesEqual(dueDates) ? curTask.dueDates:dueDates)
    }
    return(
        <div>
            {curTask.constructor===tempHabit.constructor &&
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
            {curTask.constructor===tempDaily.constructor &&
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