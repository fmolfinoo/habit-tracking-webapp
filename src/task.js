export class task{
    constructor(name,id,notes) {
        this.name=name;
        this.id=id;
        this.notes=notes;
        this.history=new Map();
        this.TaskChanges=[];
        //We add
        this.extractChanges();
    }

    //This function read the note as string for the current task and search for changes with format "[comment]: # (CHANGE:name,YYYY-MM-DD)"
    extractChanges() {

    }
    async addTaskChange(name){

    }
    async removeTaskChange(name){

    }
    //This function will replace the current note of the task on the server for the input string. And update the stored notes
    async modifyNote(note){
        //we make sure that the note is not empty or equal to null
        if(note===undefined||note===""){
            throw new Error("Empty Input Error")
        }
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