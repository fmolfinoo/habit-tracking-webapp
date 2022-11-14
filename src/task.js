export class task{
    constructor(name,id,notes) {
        this.name=name;
        this.id=id;
        this.notes=notes;
        this.history=new Map();
        this.TaskChanges=[];
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
            //Removing the date from string to get [comment]: # (CHANGE:name
            let name=e.match(matchName)[0];
            //removing the [comment]: # (CHANGE: section to get only the name
            name=name.replace(/\[comment]:\W*#\W*\(CHANGE:/g,"");
            //pattern match to get only the date
            let date=e.match(matchDate)[0]
            date=new Date (date);
            //Task Change have the format name date and copy of the source string
            this.TaskChanges.push({name : name ,date:date, copy: e});
        });

    }

    async addTaskChange(name){

    }
    async removeTaskChange(name){

    }
    //This function will replace the current note of the task on the server for the input string. And update the stored notes
    async modifyNote(note,user){
        //we make sure that the note is not empty or equal to null
        if(note==undefined||note===""){
            throw new Error("Empty Input Error")
        }
        let url="https://habitica.com/api/v3/tasks/"+this.id;
        let response= await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-api-user': user.id,
                'x-api-key': user.apiToken,
                'notes': note
            },
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
    constructor(name,id,notes,history) {
        super(name,id,notes,history);
        this.makeHistory(history);
    }
    makeHistory(history){
        history.forEach((e)=>{
            //We save the amount of positive and negative values for a given habit of a given date
            this.history.set(new Date(e.date), {Positive: e.scoredUp ,Negative:e.scoredDown})
        })
    }
}
export class daily extends task{
    constructor(name,id,dueDates,notes,history) {
        super(name,id,notes,history);
        this.dueDates=dueDates;
        this.makeHistory(history);
    }
    makeHistory(history){
        history.forEach((e)=>{
            this.history.set(new Date(e.date),e.completed)
        })
    }
}