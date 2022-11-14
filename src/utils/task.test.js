import {user} from "../user";
import {task} from "../task";

const GlobalTestUser = new user("disposable.17316@aleeas.com", "EpC8Y5XkqRKT2H");
beforeAll(async ()=>{
    await GlobalTestUser.login();
    await GlobalTestUser.getTasksData();
    await GlobalTestUser.processTaskData(this.data);
})
test("getTasksData Function-Basic TaskChange retrieval", () => {
    let testTask=new task("test",1234,"[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)");
    testTask.TaskChanges=[];
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges[0];
    expect(change.name==="I love Attack on Titan<3"&&(change.date.getTime()===new Date("2921-12-30").getTime()&&change.copy==="[comment]: #            (CHANGE:I love Attack on Titan<3,2921-12-30)")).toBe(true)
})
test("getTasksData Function-Testing with invalid inputs", () => {
    let testTask=new task("test",1234,"Hello this is a comment that should be ignored\n" +
        "\n" +
        "THIS\n" +
        "[comment]: #            (CHANGE:This is valid,2000-12-30)\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2001-13-30)\n" +
        "SHOULD NOT\n" +
        "MATTER\n" +
        "[comment]: #            (CHANGE:I love Attack on Titan<3,2921-01-42)\n");
    testTask.TaskChanges=[];
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    let change=testTask.TaskChanges[0];
    //Checking if name ,data and the amount changes retrieved are as expected
    expect(change.name==="This is valid"&&(change.date.getTime()===new Date("2000-12-30").getTime())&&testTask.TaskChanges.length===1&&change.copy==="[comment]: #            (CHANGE:This is valid,2000-12-30)").toBe(true)
})
test("getTasksData Function-Testing multiple inputs", () => {
    let testTask=new task("test",1234,"Hello this is a comment that should be ignored\n" +
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
        "\n");
    testTask.TaskChanges=[];
    testTask.extractChanges(testTask.notes)
    console.log(testTask.TaskChanges);
    //Checking if name ,data and the amount changes retrieved are as expected
    let change1=testTask.TaskChanges[0];
    let change2=testTask.TaskChanges[1];
    let change3=testTask.TaskChanges[2];
    let test=change1.name==="This valid"&&(change1.date.getTime()===new Date("2001-12-20").getTime()&&change1.copy==="[comment]: #            (CHANGE:This valid,2001-12-20)");
    let test2=change2.name===" Habitica rocks "&&(change2.date.getTime()===new Date("2011-10-01").getTime()&&change2.copy==="[comment]: #            (CHANGE: Habitica rocks ,2011-10-01)");
    let test3=change3.name===" Don't be evil "&&(change3.date.getTime()===new Date("2004-03-01").getTime()&&change3.copy==="[comment]: #            (CHANGE: Don't be evil ,2004-03-01)");
    expect(test&&test2&&test3&&testTask.TaskChanges.length===3).toBe(true)
})
test("modifyNote function test", async () => {
    GlobalTestUser.dailies.get("Comment Test");
})

