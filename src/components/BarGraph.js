import React , {useState,useEffect} from "react";
import {Bar} from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
function BarGraph({curTask,user}){
    /*
    const generateList=(n)=>{
        let list=[]
        for(var i=0;i<n;i++){
            list.push(i)
        }
        return list
    }
    const generateListNegative=(n)=>{
        let list=[]
        for(var i=0;i<n;i++){
            list.push(i*-1)
        }
        return list
    }
     */
    const generateNegativeList=(l)=>{
        let negAccumulator=[]
        for(let i=0;i<l.length;i++){
            negAccumulator[i]=-l[i]
        }
        return negAccumulator
    }
    //PlaceHolder
    console.log(curTask)
    let currentTask=undefined
    let HabitInfo=undefined
    if(curTask!==null&&curTask.element!==undefined){
        if(curTask.type==="Habits"){
            currentTask=user.habits.get(curTask.element)
            HabitInfo=currentTask.getCompleteHistory(90,currentTask.startDate)
        }else if(curTask.type==="Dailies"){
            currentTask=user.dailies.get(curTask.element)
            HabitInfo=currentTask.getCompleteHistory(90,currentTask.startDate)
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
                                 text: curTask.element
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
                                 text: curTask.element
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
export default BarGraph