import {user} from "./user";
import {daily, habit, task} from "./task";
import getDateUtcWithoutTime from "./utils/getDateUtcWithoutTime";
//You have to add your own username and password to test it
const GlobalTestUser = new user("user", "pass");
const arraysEqualNames=(a1,a2)=>{
    if(a1.length!==a2.length){
        return false
    }
    console.log(a1,a2)
    return a1.every((e,i)=>a2[i].name===e.name)
}
beforeAll(async ()=>{
    await GlobalTestUser.login();
    await GlobalTestUser.getTasksData();
    await GlobalTestUser.processTaskData(GlobalTestUser.data);
})
test("extractChanges Function-Basic TaskChange retrieval", () => {
    let testTask=new task("test",GlobalTestUser,1234,"[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)",new Date(new Date(Date.now()).toLocaleDateString()));
    testTask.TaskChanges.clear();
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges.get("I love Attack on Titan<3");
    //The month is 11 because javascript months start at 0
    expect(change.name==="I love Attack on Titan<3"&&(change.date.getTime()===new Date(2921,11,30).getTime()&&change.copy==="[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)")).toBe(true)
})
test("extractChanges Function-Testing with invalid inputs", () => {
    let testTask=new task("test",GlobalTestUser,1234,"Hello this is a comment that should be ignored\n" +
        "\n" +
        "THIS\n" +
        "[comment]: #            (CHANGE:This is valid,2000-12-30)\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2001-13-30)\n" +
        "SHOULD NOT\n" +
        "MATTER\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2921-01-42)\n","2021-01-12");
    testTask.TaskChanges.clear();
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges.get("This is valid");
    //Checking if name ,data and the amount changes retrieved are as expected
    expect(change.name==="This is valid"&&(change.date.getTime()===new Date(2000,11,30).getTime())&&testTask.TaskChanges.size===1&&change.copy==="[comment]: #            (CHANGE:This is valid,2000-12-30)").toBe(true)
})
test("extractChanges Function-Testing multiple inputs", () => {
    let testTask=new task("test",GlobalTestUser,1234,"Hello this is a comment that should be ignored\n" +
        "\n" +
        "THIS\n" +
        "[comment]: #            (CHANGE:This valid,2001-12-20)\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2001-13-30)\n" +
        "[comment]: #            (CHANGE: Habitica rocks ,2011-10-01)\n" +
        "SHOULD NOT\n" +
        "MATTER\n" +
        "[comment]: #            (CHANGE:bjbjkkj,2921-01-42)\n" +
        "\n" +
        "[comment]: #            (CHANGE: Don't be evil ,2004-03-01)\n" +
        "\n",new Date(Date.now()).toLocaleDateString());
    testTask.TaskChanges.clear();
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    //Checking if name ,data and the amount changes retrieved are as expected
    let change1=testTask.TaskChanges.get("This valid");
    let change2=testTask.TaskChanges.get(" Habitica rocks ");
    let change3=testTask.TaskChanges.get(" Don't be evil ");
    let test=change1.name==="This valid"&&(change1.date.getTime()===new Date(2001,11,20).getTime()&&change1.copy==="[comment]: #            (CHANGE:This valid,2001-12-20)");
    let test2=change2.name===" Habitica rocks "&&(change2.date.getTime()===new Date(2011,9 , 1).getTime()&&change2.copy==="[comment]: #            (CHANGE: Habitica rocks ,2011-10-01)");
    let test3=change3.name===" Don't be evil "&&(change3.date.getTime()===new Date(2004,2,1).getTime()&&change3.copy==="[comment]: #            (CHANGE: Don't be evil ,2004-03-01)");
    expect(test&&test2&&test3&&testTask.TaskChanges.size===3).toBe(true)
})

test("addTaskChange test", async () => {
    let testTask=new task("test",GlobalTestUser,1234,"",new Date(new Date(Date.now()).toLocaleDateString()));
    await testTask.addTaskChange("I love Attack on Titan<3",getDateUtcWithoutTime(testTask.startDate))
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges.get("I love Attack on Titan<3");
    //We add 1 to getUTCMonth because it counts month starting from 0 so january is 0
    console.log(testTask.TaskChanges.get("I love Attack on Titan<3"))
    let changeString="[comment]: # (CHANGE:I love Attack on Titan<3,"+getDateUtcWithoutTime(new Date(new Date(Date.now())))+")";
    expect(change.name==="I love Attack on Titan<3"&&(change.date.toLocaleDateString()===new Date(Date.now()).toLocaleDateString()&&change.copy===changeString)).toBe(true)
})
test("removeTaskChange test", async () => {
    let testTask=new task("test",GlobalTestUser,1234,"",new Date(new Date(Date.now()).toLocaleDateString()));
    console.log(testTask.TaskChanges);
    //we first add the task
    await testTask.addTaskChange("I love Attack on Titan<3",getDateUtcWithoutTime(testTask.startDate))
    //Then we remove the change
    await testTask.removeTaskChange("I love Attack on Titan<3");
    console.log(testTask.TaskChanges);
    //test if it was successfully removed
    expect(testTask.TaskChanges.size===0).toBe(true)
})
test("modifyNote Test", async () => {
    //increase time
    jest.setTimeout(20000)
    let newNote="Testing New Note"
    let commentTestTask=GlobalTestUser.tasks.get("Comment Test")
    let response=await commentTestTask.modifyNote(newNote)
    expect(response).toBe(true)
})
test("getAverage function daily test a week with every day due", () => {
    let dueDates={
        "m": true,
        "t": true,
        "w": true,
        "th": true,
        "f": true,
        "s": true,
        "su": true
    }
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"2022-10-30");
    testDaily.history.set("11/28/2022",true)
    testDaily.history.set("11/25/2022",true)
    testDaily.history.set("11/26/2022",false)
    testDaily.history.set("11/29/2022",true)
    let result=testDaily.getAverage(7,testDaily.startDate,testDaily.dueDates,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result===2.0/7.0).toBe(true)
})
test("getAverage function on dailies object with every day due and 30 days", () => {
    let dueDates={
        "m": true,
        "t": true,
        "w": true,
        "th": true,
        "f": true,
        "s": true,
        "su": true
    }
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"2022-10-30");
    testDaily.history.set("11/20/2022",true)
    testDaily.history.set("11/1/2022",true)
    testDaily.history.set("11/8/2022",true)
    testDaily.history.set("11/21/2022",true)
    testDaily.history.set("11/29/2022",true)
    let result=testDaily.getAverage(30,testDaily.startDate,testDaily.dueDates,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result===4.0/30.0).toBe(true)
})
test("getAverage function daily test with some days disabled", () => {
    let dueDates={
        "m": false,
        "t": true,
        "w": true,
        "th": true,
        "f": true,
        "s": true,
        "su": false
    }
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"2022-10-30");
    testDaily.history.set("11/21/2022",false)
    testDaily.history.set("11/22/2022",true)
    testDaily.history.set("11/23/2022",true)
    testDaily.history.set("11/24/2022",true)
    testDaily.history.set("11/25/2022",true)
    testDaily.history.set("11/26/2022",true)
    testDaily.history.set("11/27/2022",true)
    let result=testDaily.getAverage(7,testDaily.startDate,testDaily.dueDates,new Date('11/28/2022'))
    console.log("Result",result)
    expect(result===1.0).toBe(true)
})
test("getAverage function daily test for task with no data", () => {
    let dueDates={
        "m": false,
        "t": true,
        "w": true,
        "th": true,
        "f": true,
        "s": true,
        "su": false
    }
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"11/28/2022");
    let result=testDaily.getAverage(7,testDaily.startDate,new Date('11/28/2022'))
    console.log("Result",result)
    expect(result===0.0).toBe(true)
})

test("getAverage function for habit type test for a week", () => {
    let testHabit=new habit("test",GlobalTestUser,"1234","",[],"2022-10-30");
    testHabit.history.set("11/28/2022",{Positive: 1 ,Negative:0})
    testHabit.history.set("11/25/2022",{Positive: 5 ,Negative:5})
    testHabit.history.set("11/26/2022",{Positive: 8 ,Negative:2})
    testHabit.history.set("11/29/2022",{Positive: 9 ,Negative:6})
    let result=testHabit.getAverage(7,testHabit.startDate,testHabit.dueDates,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result.Positive===14.0/7.0&&result.Negative===1.0).toBe(true)
})
test("getAverage function for habit type test for a week without counting every day", () => {
    let testHabit=new habit("test",GlobalTestUser,"1234","",[],"2022-10-30");
    testHabit.history.set("11/28/2022",{Positive: 1 ,Negative:0})
    testHabit.history.set("11/25/2022",{Positive: 5 ,Negative:5})
    testHabit.history.set("11/26/2022",{Positive: 8 ,Negative:2})
    testHabit.history.set("11/29/2022",{Positive: 9 ,Negative:6})
    let result=testHabit.getAverage(7,testHabit.startDate,new Map(Object.entries({"m": false, "t": true, "w": true, "th": true, "f": false, "s": true, "su": true})),new Date('11/29/2022'))
    console.log("Result",result)
    expect(result.Positive===8.0/5.0&&result.Negative===2.0/5.0).toBe(true)
})
test("getAverage function for habit type test without data", () => {
    let testHabit=new habit("test",GlobalTestUser,"1234","",[],'2022-11-29');
    testHabit.history.set("11/29/2022",{Positive: 9 ,Negative:6})
    let result=testHabit.getAverage(7,testHabit.startDate,testHabit.dueDates,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result.Positive===0.0&&result.Negative===0.0).toBe(true)
})
test("getTotalDaysSinceStart function",()=>{
    let testHabit=new daily("test",GlobalTestUser,"1234",["su","m", "t", "w", "th", "f", "s"],"",[],'2022-11-21');
    let now=new Date('11/28/2022').getTime()//12/01/2022 on seconds
    expect(testHabit.getTotalDaysSinceStart(now)).toBe(7)
})
test("getCompleteHistory function for daily type counting every day",()=>{
    let testDaily=new daily("test",GlobalTestUser,"1234",{"m": true, "t": true, "w": true, "th": true, "f": true, "s": true, "su": true},"",[],'2022-11-21');
    testDaily.history.set("1/1/2023",false)
    testDaily.history.set("1/4/2023",false)
    testDaily.history.set("1/5/2023",true)
    testDaily.history.set("1/2/2023",true)
    testDaily.history.set("1/10/2023",false)
    testDaily.history.set("12/31/2022",true)
    let now=new Date('1/7/2023')
    let completeHistory=testDaily.getCompleteHistory(7,testDaily.startDate,testDaily.dueDates,now)
    console.log(completeHistory)
    let testDates=arraysEqualNames(completeHistory.days,["12/31/2022","1/1/2023","1/2/2023","1/3/2023","1/4/2023","1/5/2023","1/6/2023"])
    let testData=arraysEqualNames(completeHistory.data,[1,0,1,0,0,1,0])
    expect(testDates&&testData).toBe(true)
})
test("getCompleteHistory function for habit type couting every day",()=>{
    let testDaily=new habit("test",GlobalTestUser,"1234","",[],'2022-11-21');
    testDaily.history.set("1/1/2023",{Positive:3 ,Negative:0})
    testDaily.history.set("1/4/2023",{Positive:0 ,Negative:5})
    testDaily.history.set("1/5/2023",{Positive:2 ,Negative:1})
    testDaily.history.set("1/2/2023",{Positive:10 ,Negative:0})
    testDaily.history.set("1/10/2023",{Positive:0 ,Negative:0})
    testDaily.history.set("12/31/2022",{Positive:1 ,Negative:0})
    let now=new Date('1/7/2023')
    let completeHistory=testDaily.getCompleteHistory(7,testDaily.startDate,testDaily.dueDates,now)
    console.log(completeHistory)
    let testDates=arraysEqualNames(completeHistory.days,["12/31/2022","1/1/2023","1/2/2023","1/3/2023","1/4/2023","1/5/2023","1/6/2023"])
    let testData1=arraysEqualNames(completeHistory.positiveData,[1,3,10,0,0,2,0])
    let testData2=arraysEqualNames(completeHistory.negativeData,[0,0,0,0,5,1,0])
    expect(testDates&&testData1&&testData2).toBe(true)
})
test("getCompleteHistory function for daily type without counting every day",()=>{
    let testDaily=new daily("test",GlobalTestUser,"1234",{"m": false, "t": true, "w": true, "th": true, "f": true, "s": true, "su": false},"",[],'2022-11-21');
    testDaily.history.set("1/1/2023",false)
    testDaily.history.set("1/4/2023",false)
    testDaily.history.set("1/5/2023",true)
    testDaily.history.set("1/2/2023",true)
    testDaily.history.set("1/10/2023",false)
    testDaily.history.set("12/31/2022",true)
    let now=new Date('1/7/2023')
    let completeHistory=testDaily.getCompleteHistory(7,testDaily.startDate,testDaily.dueDates,now)
    console.log(completeHistory)
    let testDates=arraysEqualNames(completeHistory.days,["12/31/2022","1/3/2023","1/4/2023","1/5/2023","1/6/2023"])
    let testData=arraysEqualNames(completeHistory.data,[1,0,0,1,0])
    expect(testDates&&testData).toBe(true)
})
test("getCompleteHistory function for habit type without counting every day",()=>{
    let testDaily=new habit("test",GlobalTestUser,"1234","",[],'2022-11-21');
    testDaily.history.set("1/1/2023",{Positive:3 ,Negative:0})
    testDaily.history.set("1/4/2023",{Positive:0 ,Negative:5})
    testDaily.history.set("1/5/2023",{Positive:2 ,Negative:1})
    testDaily.history.set("1/2/2023",{Positive:10 ,Negative:0})
    testDaily.history.set("1/10/2023",{Positive:0 ,Negative:0})
    testDaily.history.set("12/31/2022",{Positive:1 ,Negative:0})
    let now=new Date('1/7/2023')
    let completeHistory=testDaily.getCompleteHistory(7,testDaily.startDate,new Map(Object.entries({"m": true, "t": false, "w": true, "th": true, "f": false, "s": true, "su": true})),now)
    console.log(completeHistory)
    let testDates=arraysEqualNames(completeHistory.days,["12/31/2022","1/1/2023","1/2/2023","1/4/2023","1/5/2023"])
    let testData1=arraysEqualNames(completeHistory.positiveData,[1,3,10,0,2])
    let testData2=arraysEqualNames(completeHistory.negativeData,[0,0,0,5,1])
    expect(testDates&&testData1&&testData2).toBe(true)
})
test("getChangesList function with generic task",()=> {
    let testTask=new task("test",GlobalTestUser,1234,"Hello this is a comment that should be ignored\n" +
        "\n" +
        "THIS\n" +
        "[comment]: #            (CHANGE:Bought a new computer,2023-01-10)\n" +
        "[comment]: #            (CHANGE:Test Change 1,2023-01-15)\n" +
        "[comment]: #            (CHANGE:Started going to the library,2022-12-12)\n" +
        "\n",new Date(Date.now()).toLocaleDateString());
    testTask.TaskChanges.clear();
    testTask.extractChanges(testTask.notes)
    console.log(testTask.getChangesList());
    //Checking if name ,data and the amount changes retrieved are as expected
    let expectedChanges=[
        {
            name: 'Bought a new computer',
            date: new  Date("2023-01-10T05:00:00.000Z"),
            copy: '[comment]: #            (CHANGE:Bought a new computer,2023-01-10)'},
    {
        name: 'Test Change 1',
        date: new  Date("2023-01-15T05:00:00.000Z"),
        copy: '[comment]: #            (CHANGE:Test Change 1,2023-01-15)'
    },
    {
        name: 'Started going to the library',
        date: new Date("2022-12-12T05:00:00.000Z"),
        copy: '[comment]: #            (CHANGE:Started going to the library,2022-12-12)'
    }]
    expect(arraysEqualNames(testTask.getChangesList(),expectedChanges)).toBe(true)
})