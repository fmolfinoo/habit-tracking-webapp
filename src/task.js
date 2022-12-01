export class task{
    constructor(name,user,id,notes,startDate) {
        this.name=name;
        this.user=user;
        this.id=id;
        this.notes=notes;
        this.history=new Map();
        this.TaskChanges=new Map();
        this.startDate=new Date(startDate)
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
            date=new Date (date);
            //Task Change have the format name date and copy of the source string
            let changeObj={name : name ,date:date, copy: e};
            this.TaskChanges.set(name,changeObj);
        });

    }
    async addTaskChange(name){
        let now=new Date(Date.now())
        let changeDate=new Date(now.toLocaleDateString());
        //We add 1 to getUTCMonth because it counts month starting from 0 so january is 0
        let changeString="[comment]: # (CHANGE:"+name+","+changeDate.getUTCFullYear()+"-"+(changeDate.getUTCMonth()+1)+"-"+changeDate.getUTCDate()+")";
        let changeObj={name : name ,date:changeDate, copy:changeString}
        this.TaskChanges.set(name,changeObj)
        if(this.TaskChanges.size===0){
            this.notes=this.notes+"\n"+"[comment]: # (BELOW THIS COMMENT LIES ALL THE CHANGES INFORMATION RELATED TO THIS TASK DON'T DELETE OR WRITE NOTES BELOW THIS MESSAGE)"
        }
        //We add a new line and append the change to the end of the note
        this.notes=this.notes+"\n"+changeString
        //await this.modifyNote(this.notes)
    }
    async removeTaskChange(name){
        this.notes=this.notes.replace(this.TaskChanges.get(name).copy,"")
        //await this.modifyNote(this.notes)
        this.TaskChanges.delete(name)
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
        }
        return response.success;
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
    getAverage(timeFrame,startDate,now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=startDate
        }
        let numDays=0.0
        let PositiveSum=0.0;
        let NegativeSum=0.0;
        while(currentDate.getTime()<now.getTime()){
            //We get the value of the current day
            let dayValue = this.history.get(currentDate.toLocaleDateString())
            //If day exist on the history we add data to the sum
            if (dayValue !== undefined && dayValue !== null) {
                PositiveSum+=dayValue.Positive
                NegativeSum+=dayValue.Negative
            }
            //We increase the currentDate by one day
            currentDate.setDate(currentDate.getDate() + 1)
            numDays += 1.0
            }
        console.log("numDays",numDays,"PositiveSum",PositiveSum,"NegativeSum",NegativeSum)
        //If the numDays passed is not zero we return the average success rate else we return 0
        return numDays!==0.0 ? {Positive:PositiveSum/numDays,Negative:NegativeSum/numDays} : {Positive:0.0,Negative:0.0}
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
            this.history.set(new Date(e.date).toLocaleDateString(),e.completed)
        })
    }
    /**
     * This function takes a timeFrame in days and the startDate as a Date and calculates the average completion rate of the daily task and return it as a float
     * @param {number}timeFrame
     * @param {Date} startDate
     * @param {Date} now
     * @return {number}
     */
    getAverage(timeFrame,startDate,now=new Date(new Date(Date.now()).toLocaleDateString())){
        let startOfTimeFrame=new Date(now.toLocaleDateString())
        startOfTimeFrame.setDate(startOfTimeFrame.getDate()-timeFrame)
        let currentDate
        //if the day of the task creation is earlier than the start of the Timeframe
        if(startDate.getTime()<startOfTimeFrame.getTime()){
            currentDate=startOfTimeFrame
        }else{//If the day of the task creation is after calculated start of the timeframe
            currentDate=startDate
        }
        let numDays=0.0
        let sum=0.0;
        //Days start with sunday at 0 index and end at saturday at 6 index
        const days=["su","m", "t", "w", "th", "f", "s"]
        while(currentDate.getTime()<now.getTime()){
            //If current day is not a due date we skip it
            if(!this.dueDates.get(days[currentDate.getDay()])){
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
        console.log("numDays",numDays,"Sum",sum)
        //If the numDays passed is not zero we return the average success rate else we return 0
        return numDays!==0.0 ? sum/numDays : 0.0
    }
}
