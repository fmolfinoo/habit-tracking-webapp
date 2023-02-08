import getDateFromString from "./utils/getDateFromString";

export class task{
    constructor(name,user,id,notes,startDate) {
        this.name=name;
        this.user=user;
        this.id=id;
        this.notes=notes;
        this.history=new Map();
        this.TaskChanges=new Map();
        this.startDate=getDateFromString(startDate)
        this.extractChanges(this.notes);
    }

    //This function read the note as string for the current task and search for changes with format "[comment]: # (CHANGE:name,YYYY-MM-DD)"
    extractChanges(note) {
        //Regular expression used for pattern matching on string
        const regularExpression=new RegExp(/\[comment]:\W*#\W*\(CHANGE:.*,[0-9]{4}-(1[0-2]|0[0-9])-[0-3][0-9]\)/g);
        let matchedList=note.match(regularExpression);
        //If there is no match return
        if(matchedList===null){
            return;
        }
        const matchDate = new RegExp(/[0-9]{4}-(1[0-2]|0[0-9])-[0-3][0-9]/g);
        const matchName = new RegExp(/.*(?=,[0-9]{4}-(1[0-2]|0[0-9])-[0-3][0-9]\))/g);
        matchedList.forEach((e)=>{
            //Have to do this process to get name because lookbehind is not supported on Safari
            let name="";
            //Removing the date from string to get [comment]: # (CHANGE:name
            name=e.match(matchName)[0];
            //removing the [comment]: # (CHANGE: section to get only the name
            name=name.replace(/\[comment]:\W*#\W*\(CHANGE:/g,"");
            //pattern match to get only the date
            let date=e.match(matchDate)[0]
            let splitDate=date.split("-")
            //This using numbers instead of strings fix the problem where javascript change the date to account for difference in timezone
            date=new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
            //Task Change have the format name date and copy of the source string
            let changeObj={name : name ,date:date, copy: e};
            this.TaskChanges.set(name,changeObj);
        });

    }
    async addTaskChange(changeName,changeDate){
        if(this.TaskChanges.has(changeName)) {
            alert("ERROR:You cannot put the name of change that already exists")
            return
        }
        //We add 1 to getUTCMonth because it counts month starting from 0 so january is 0
        let changeString="[comment]: # (CHANGE:"+changeName+","+changeDate+")";
        let changeObj={name : changeName ,date:getDateFromString(changeDate), copy:changeString}
        //we check if there is no other chamges and the warning message have not been added before
        if(this.TaskChanges.size===0&&!this.notes.includes("[comment]: # (BELOW THIS COMMENT LIES ALL THE CHANGES INFORMATION RELATED TO THIS TASK DON'T DELETE OR WRITE NOTES BELOW THIS MESSAGE)")){
            this.notes=this.notes+"\n"+"[comment]: # (BELOW THIS COMMENT LIES ALL THE CHANGES INFORMATION RELATED TO THIS TASK DON'T DELETE OR WRITE NOTES BELOW THIS MESSAGE)"
        }
        this.TaskChanges.set(changeName,changeObj)
        //We add a new line and append the change to the end of the note
        this.notes=this.notes+"\n"+changeString
        let success=await this.modifyNote(this.notes)
        if(!success){
            alert("Communication with Server Failed changes could not be saved")
        }
        console.log("Current Changes",this.TaskChanges)

    }
    async modifyTaskChange(changeObj,newName,newDate){
        if(changeObj.name!==newName&&this.TaskChanges.has(newName)) {
            alert("ERROR:You cannot put the name of change that already exists")
            return
        }
        //We delete the old key from the map
        this.TaskChanges.delete(changeObj.name)
        let changeString="[comment]: # (CHANGE:"+newName+","+newDate+")";
        changeObj.name=newName
        changeObj.date=getDateFromString(newDate)
        //we delete the change record of the note
        this.notes=this.notes.replace(changeObj.copy,"")
        //we add the new change record
        changeObj.copy=changeString
        this.notes=this.notes+changeString
        // we add the new key to the map
        this.TaskChanges.set(changeObj.name,changeObj)
        let success=await this.modifyNote(this.notes)
        if(!success){
            alert("Communication with Server Failed")
        }
        console.log("Current Changes",this.TaskChanges)
    }

    async removeTaskChange(name){
        this.notes=this.notes.replace(this.TaskChanges.get(name).copy,"")
        this.TaskChanges.delete(name)
        let success =await this.modifyNote(this.notes)
        if(!success){
            alert("Communication with Server Failed")
        }
        console.log("Current Changes",this.TaskChanges)
    }
    //This function will replace the current note of the task on the server for the input string. And update the stored notes
    async modifyNote(note){
        //we make sure that the note is not empty or equal to null
        if(note===undefined||note===""){
            throw new Error("Empty Input Error")
        }
        console.log(note)
        let url="https://habitica.com/api/v3/tasks/"+this.id;
        let response= await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-api-user': this.user.id,
                'x-api-key': this.user.apiToken
            },
            body: JSON.stringify({
                notes: note
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            return data
        }).catch(error => console.log("ERROR:", error));
        //If we get a positive response from server we assign the new note to the task
        if(response.success) {
            this.notes=response.data.notes;
            //we save the new state into local storage
            await this.user.refresh();
        }
        return response.success;
    }
    getTotalDaysSinceStart(now=Date.now()){

        return Math.floor((now -this.startDate.getTime())/(1000*60*60*24))
    }
    getChangesList(){
        let changesList=[]
        this.TaskChanges.forEach((values)=>{
            changesList.push(values)
        })
        return changesList
    }

}
export class habit extends task{
    // eslint-disable-next-line no-useless-constructor
    /**
     *
     * @param {string}name
     * @param {user}user
     * @param {string}id
     * @param {string}notes
     * @param history
     * @param {string}startDate
     */
    constructor(name,user,id,notes,history,startDate) {
        super(name,user,id,notes,startDate);
        this.makeHistory(history);
    }
    makeHistory(history){
        history.forEach((e)=>{
            //We save the amount of positive and negative values for a given habit of a given date
            this.history.set(new Date(e.date).toLocaleDateString(), {Positive: e.scoredUp ,Negative:e.scoredDown})
        })
    }
    getAverage(timeFrame,startDate=this.startDate,dueDates=new Map(Object.entries({"m": true, "t": true, "w": true, "th": true, "f": true, "s": true, "su": true})),now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=new Date(startDate.toLocaleDateString())
        }
        //Days start with sunday at 0 index and end at saturday at 6 index
        const days=["su","m", "t", "w", "th", "f", "s"]
        let numDays=0.0
        let PositiveSum=0.0;
        let NegativeSum=0.0;
        while(currentDate.getTime()<now.getTime()) {
            //If current day is not a due date we skip it
            if (!dueDates.get(days[currentDate.getDay()])) {
                currentDate.setDate(currentDate.getDate() + 1)
            } else {
                //We get the value of the current day
                let dayValue = this.history.get(currentDate.toLocaleDateString())
                //If day exist on the history we add data to the sum
                if (dayValue !== undefined && dayValue !== null) {
                    PositiveSum += dayValue.Positive
                    NegativeSum += dayValue.Negative
                }
                //We increase the currentDate by one day
                currentDate.setDate(currentDate.getDate() + 1)
                numDays += 1.0
            }
        }
        //console.log("numDays",numDays,"PositiveSum",PositiveSum,"NegativeSum",NegativeSum)
        //If the numDays passed is not zero we return the average success rate else we return 0
        return numDays!==0.0 ? {Positive:PositiveSum/numDays,Negative:NegativeSum/numDays} : {Positive:0.0,Negative:0.0}
    }
    /***
     *
     * @param {int}timeFrame
     * @param {Date}startDate
     * @param {Date}now
     * @param {Map<string,string>}dueDates
     * @return {{positiveData: *[], negativeData: *[], days: *[]}}
     */
    getCompleteHistory(timeFrame,startDate=this.startDate,dueDates=new Map(Object.entries({"m": true, "t": true, "w": true, "th": true, "f": true, "s": true, "su": true})),now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=new Date(startDate.toLocaleDateString())
        }
        //Days start with sunday at 0 index and end at saturday at 6 index
        const days=["su","m", "t", "w", "th", "f", "s"]
        let DataListPositive=[]
        let DataListNegative=[]
        let DaysList=[]
        while(currentDate.getTime()<now.getTime()){
            //If current day is not a due date we skip it
            if(!dueDates.get(days[currentDate.getDay()])){
                currentDate.setDate(currentDate.getDate()+1)
            }else {
                //We get the value of the current day
                let dayValue = this.history.get(currentDate.toLocaleDateString())
                DaysList.push(currentDate.toLocaleDateString())

                if (dayValue !== undefined && dayValue !== null) {
                    //if there is an input for the day we record the values
                    DataListPositive.push(dayValue.Positive)
                    DataListNegative.push(dayValue.Negative)
                }else{
                    //else we put 0 as the data
                    DataListPositive.push(0)
                    DataListNegative.push(0)
                }
                //We increase the currentDate by one day
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }
        return {days:DaysList ,positiveData:DataListPositive ,negativeData:DataListNegative}
    }
}
export class daily extends task{
    /**
     *
     * @param {string}name
     * @param {user}user
     * @param {string}id
     * @param {Object} dueDates
     * @param {string}notes
     * @param {Object}history
     * @param {string}startDate
     */
    constructor(name,user,id,dueDates,notes,history,startDate) {
        super(name,user,id,notes,startDate);
        this.dueDates=new Map(Object.entries(dueDates));
        this.makeHistory(history);
    }
    makeHistory(history){
        history.forEach((e)=>{
            //If completed is undefined then convert to false else we put the current value
            this.history.set(new Date(e.date).toLocaleDateString(),e.completed===undefined ? false :e.completed)
        })
    }
    /**
     * This function takes a timeFrame in days and the startDate as a Date and calculates the average completion rate of the daily task and return it as a float
     * @param {number}timeFrame
     * @param {Date} startDate
     * @param {Date} now
     * @param {Map<string,boolean>}dueDates
     * @return {number}
     */
    getAverage(timeFrame,startDate=this.startDate,dueDates=this.dueDates,now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=new Date(startDate.toLocaleDateString())
        }
        let numDays=0.0
        let sum=0.0;
        //Days start with sunday at 0 index and end at saturday at 6 index
        const days=["su","m", "t", "w", "th", "f", "s"]
        while(currentDate.getTime()<now.getTime()){
            //If current day is not a due date we skip it
            if(!dueDates.get(days[currentDate.getDay()])){
                currentDate.setDate(currentDate.getDate()+1)
            }else {
                //We get the value of the current day
                let dayValue = this.history.get(currentDate.toLocaleDateString())
                if (dayValue !== undefined && dayValue !== null && dayValue) {
                    sum += 1.0
                }
                //We increase the currentDate by one day
                currentDate.setDate(currentDate.getDate() + 1)
                numDays += 1.0
            }
        }
        //console.log("numDays",numDays,"Sum",sum)
        //If the numDays passed is not zero we return the average success rate else we return 0
        return numDays!==0.0 ? sum/numDays : 0.0
    }
    /***
     *
     * @param {int}timeFrame
     * @param {Date}startDate
     * @param {Date}now
     * @param {Map<string,boolean>}dueDates
     * @return {{data: *[], days: *[]}}
     */
    getCompleteHistory(timeFrame,startDate=this.startDate,dueDates=this.dueDates,now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=new Date(startDate.toLocaleDateString())
        }
        //Days start with sunday at 0 index and end at saturday at 6 index
        const days=["su","m", "t", "w", "th", "f", "s"]
        let DataList=[]
        let DaysList=[]
        while(currentDate.getTime()<now.getTime()){
            //If current day is not a due date we skip it
            if(!dueDates.get(days[currentDate.getDay()])){
                currentDate.setDate(currentDate.getDate()+1)
            }else {
                //We get the value of the current day
                let dayValue = this.history.get(currentDate.toLocaleDateString())
                DaysList.push(currentDate.toLocaleDateString())
                if (dayValue !== undefined && dayValue !== null && dayValue) {
                    //If the task have been completed then we record one
                    DataList.push(1)
                }else{
                    //else if it wasn't completed or have not been recorded we put 0
                    DataList.push(0)
                }
                //We increase the currentDate by one day
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }
        return {days:DaysList , data:DataList}
    }

}