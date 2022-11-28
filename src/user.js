import {habit,task,daily} from "./task";

export class user{

    constructor(username,password,id=undefined,apiToken=undefined,data=undefined) {
        this.username=username;
        this.password=password;
        this.id=id
        this.apiToken=apiToken
        this.data=data
        this.dailies=new Map();
        this.habits=new Map();
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
                let d=new daily(task.text,this,task.id,task.repeat,task.notes,task.history);
                this.dailies.set(task.text,d);
            }else if(task.type==="habit") {
                let h=new habit(task.text,this,task.id,task.notes,task.history);
                this.habits.set(task.text,h)
            }
        })
    }

}

