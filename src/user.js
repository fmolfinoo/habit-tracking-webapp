import {habit,task,daily} from "./task";

export class user{
    constructor(username,password) {
        this.username=username;
        this.password=password;
        this.id=undefined
        this.apiToken=undefined
        this.data=undefined
        this.dailies=[];
        this.habits=[];
    }
    //This function send a login request to the server and save the id and api token to get more information from server
    async login(){
        const response=await fetch("https://habitica.com/api/v3/user/auth/local/login", {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password
            })
        }).then(res=>{
            return res.json()
        }).then(data=>{
            return data
        }).catch(error=>console.log("ERROR:",error))
        if(response.success) {
            this.id = response.data.id
            this.apiToken = response.data.apiToken
        }
        return response.success
    }
    async getTasksData(taskType=""){
        let url="https://habitica.com/api/v3/tasks/user"
        if(taskType!==""){
            url=url+"?type ="+taskType
        }
        let response= await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-user': this.id,
                'x-api-key': this.apiToken
            },
        }).then(res => {
            return res.json()
        }).then(data => {
            return data
        }).catch(error => console.log("ERROR:", error));
        if(response.success) {
            this.data = response.data;
        }
        return response.success;

    }
    processTaskData(data){
        data.forEach((task)=>{
            if(task.type==="daily"){
                let d=new daily(task.text,task.id,task.repeat,task.notes,task.history);
                this.dailies.push(d);
            }else if(task.type==="habit") {
                let h=new habit(task.text,task.id,task.notes,task.history);
                this.habits.push(h)
            }
        })
    }
    /*
    async getTasksDataCSV(){
        const response=await fetch("https://habitica.com/export/history.csv", {
            method: "GET",
            headers:{
                'Content-Type':'application/json',
                'x-api-user':this.id,
                'x-api-key':this.apiToken
            },
            }).then(res=>{
            return res.text()
        }).then(data=>{
            return data
        }).catch(error=>console.log("ERROR:",error))
        return response;
    }
     */

}

