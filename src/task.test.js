import {user} from "./user";
import {daily, habit, task} from "./task";

const GlobalTestUser = new user("disposable.17316@aleeas.com", "EpC8Y5XkqRKT2H");
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
    expect(change.name==="I love Attack on Titan<3"&&(change.date.getTime()===new Date("2921-12-30").getTime()&&change.copy==="[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)")).toBe(true)
})
test("extractChanges Function-Testing with invalid inputs", () => {
    let testTask=new task("test",GlobalTestUser,1234,"Hello this is a comment that should be ignored\n" +
        "\n" +
        "THIS\n" +
        "[comment]: #            (CHANGE:This is valid,2000-12-30)\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2001-13-30)\n" +
        "SHOULD NOT\n" +
        "MATTER\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2921-01-42)\n");
    testTask.TaskChanges.clear();
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges.get("This is valid");
    //Checking if name ,data and the amount changes retrieved are as expected
    expect(change.name==="This is valid"&&(change.date.getTime()===new Date("2000-12-30").getTime())&&testTask.TaskChanges.size===1&&change.copy==="[comment]: #            (CHANGE:This is valid,2000-12-30)").toBe(true)
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
    let test=change1.name==="This valid"&&(change1.date.getTime()===new Date("2001-12-20").getTime()&&change1.copy==="[comment]: #            (CHANGE:This valid,2001-12-20)");
    let test2=change2.name===" Habitica rocks "&&(change2.date.getTime()===new Date("2011-10-01").getTime()&&change2.copy==="[comment]: #            (CHANGE: Habitica rocks ,2011-10-01)");
    let test3=change3.name===" Don't be evil "&&(change3.date.getTime()===new Date("2004-03-01").getTime()&&change3.copy==="[comment]: #            (CHANGE: Don't be evil ,2004-03-01)");
    expect(test&&test2&&test3&&testTask.TaskChanges.size===3).toBe(true)
})

test("addTaskChange test", async () => {
    let testTask=new task("test",GlobalTestUser,1234,"",new Date(new Date(Date.now()).toLocaleDateString()));
    await testTask.addTaskChange("I love Attack on Titan<3")
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges.get("I love Attack on Titan<3");
    let now=new Date(Date.now())
    let changeDate=new Date(now.toLocaleDateString());
    //We add 1 to getUTCMonth because it counts month starting from 0 so january is 0
    let changeString="[comment]: # (CHANGE:I love Attack on Titan<3,"+changeDate.getUTCFullYear()+"-"+(changeDate.getUTCMonth()+1)+"-"+changeDate.getUTCDate()+")";
    expect(change.name==="I love Attack on Titan<3"&&(change.date.toLocaleDateString()===new Date(Date.now()).toLocaleDateString()&&change.copy===changeString)).toBe(true)
})
test("removeTaskChange test", async () => {
    let testTask=new task("test",GlobalTestUser,1234,"[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)",new Date(new Date(Date.now()).toLocaleDateString()));
    console.log(testTask.TaskChanges);
    await testTask.removeTaskChange("I love Attack on Titan<3");
    console.log(testTask.TaskChanges);
    expect(testTask.TaskChanges.size===0).toBe(true)
})
test("modifyNote Test", async () => {
    //increase time
    jest.setTimeout(20000)
    let newNote="Testing New Note"
    let commentTestTask=GlobalTestUser.dailies.get("Comment Test")
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
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"10/30/2022");
    testDaily.history.set("11/28/2022",true)
    testDaily.history.set("11/25/2022",true)
    testDaily.history.set("11/26/2022",false)
    testDaily.history.set("11/29/2022",true)
    let result=testDaily.getAverage(7,testDaily.startDate,new Date('11/29/2022'))
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
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"10/30/2022");
    testDaily.history.set("11/20/2022",true)
    testDaily.history.set("11/1/2022",true)
    testDaily.history.set("11/8/2022",true)
    testDaily.history.set("11/21/2022",true)
    testDaily.history.set("11/29/2022",true)
    let result=testDaily.getAverage(30,testDaily.startDate,new Date('11/29/2022'))
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
    let testDaily=new daily("test",GlobalTestUser,"1234",dueDates,"",[],"10/30/2022");
    testDaily.history.set("11/21/2022",false)
    testDaily.history.set("11/22/2022",true)
    testDaily.history.set("11/23/2022",true)
    testDaily.history.set("11/24/2022",true)
    testDaily.history.set("11/25/2022",true)
    testDaily.history.set("11/26/2022",true)
    testDaily.history.set("11/27/2022",true)
    let result=testDaily.getAverage(7,testDaily.startDate,new Date('11/28/2022'))
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
    let testDaily=new habit("test",GlobalTestUser,"1234","",[],"10/30/2022");
    testDaily.history.set("11/28/2022",{Positive: 1 ,Negative:0})
    testDaily.history.set("11/25/2022",{Positive: 5 ,Negative:5})
    testDaily.history.set("11/26/2022",{Positive: 8 ,Negative:2})
    testDaily.history.set("11/29/2022",{Positive: 9 ,Negative:6})
    let result=testDaily.getAverage(7,testDaily.startDate,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result.Positive===14.0/7.0&&result.Negative===1.0).toBe(true)
})
test("getAverage function for habit type test without data", () => {
    let testDaily=new habit("test",GlobalTestUser,"1234","",[],'11/29/2022');
    testDaily.history.set("11/29/2022",{Positive: 9 ,Negative:6})
    let result=testDaily.getAverage(7,testDaily.startDate,new Date('11/29/2022'))
    console.log("Result",result)
    expect(result.Positive===0.0&&result.Negative===0.0).toBe(true)
})
test("Test getTotalDaysSinceStart function",()=>{
    let testDaily=new habit("test",GlobalTestUser,"1234","",[],'11/21/2022');
    let now=new Date('11/28/2022').getTime()//12/01/2022 on seconds
    expect(testDaily.getTotalDaysSinceStart(now)).toBe(7)

})



