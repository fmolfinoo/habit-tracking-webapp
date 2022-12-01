import {user} from "./user";
import login from "./pages/login";
const GlobalTestUser = new user("disposable.17316@aleeas.com", "EpC8Y5XkqRKT2H");
beforeAll(async ()=>{
    let response=await GlobalTestUser.login();
    if(!response){
        throw Error("Unable to login")
    }
})
test("Login function",async () => {
    let testUser=new user("disposable.17316@aleeas.com","EpC8Y5XkqRKT2H")
    let test = async () => {
        let respond = await testUser.login()
        return !!(respond && testUser.id !== undefined && testUser.apiToken !== undefined);
    }
    let result = await test();
    expect(result).toBe(true)
})

test("getTasksData Function",async () => {
    let success=await GlobalTestUser.getTasksData();
    console.log(GlobalTestUser.data)
    expect(success&&GlobalTestUser.data!==undefined).toBe(true)
})
test("ProcessTasksData Function-check if any task have been process successfully", async () => {
    await GlobalTestUser.getTasksData();
    GlobalTestUser.processTaskData(GlobalTestUser.data);
    console.log(GlobalTestUser.dailies);
    console.log(GlobalTestUser.habits);
    expect(GlobalTestUser.dailies.length!==0&&GlobalTestUser.habits.length!==0).toBe(true);
})

test("ProcessTasksData Function-Process daily", async () => {
    await GlobalTestUser.getTasksData();
    GlobalTestUser.data=[{
        "repeat": {
            "m": true,
            "t": false,
            "w": true,
            "th": true,
            "f": false,
            "s": true,
            "su": true
        },
        "challenge": {},
        "group": {
            "completedBy": {},
            "assignedUsers": []
        },
        "frequency": "daily",
        "everyX": 1,
        "streak": 1,
        "nextDue": [
            "Tue Nov 15 2022 00:00:00 GMT+0000",
            "Wed Nov 16 2022 00:00:00 GMT+0000",
            "Thu Nov 17 2022 00:00:00 GMT+0000",
            "Fri Nov 18 2022 00:00:00 GMT+0000",
            "Sat Nov 19 2022 00:00:00 GMT+0000",
            "Sun Nov 20 2022 00:00:00 GMT+0000"
        ],
        "yesterDaily": true,
        "history": [
            {
                "date": 1667751025072,
                "value": 1.000000414687937,
                "isDue": true,
                "completed": true
            },
            {
                "date": 1668009044075,
                "value": 0.025300425045689412,
                "isDue": true,
                "completed": false
            },
            {
                "date": 1668390247160,
                "value": 1.0246522979235748,
                "isDue": true,
                "completed": true
            }
        ],
        "completed": false,
        "collapseChecklist": false,
        "type": "daily",
        "notes": "[comment]:#(CHANGE:testChange,2022-09-06)",
        "tags": [],
        "value": 1.0246522979235748,
        "priority": 1,
        "attribute": "str",
        "byHabitica": false,
        "startDate": "2022-11-06T00:00:00.000Z",
        "daysOfMonth": [],
        "weeksOfMonth": [],
        "checklist": [],
        "reminders": [],
        "createdAt": "2022-11-06T16:09:58.151Z",
        "updatedAt": "2022-11-14T01:44:07.341Z",
        "_id": "29da4058-a00b-46b1-bb98-98c583d670a7",
        "text": "Daily 1",
        "userId": "46f25f19-78f0-4703-a729-6bb75e72aff0",
        "isDue": true,
        "id": "29da4058-a00b-46b1-bb98-98c583d670a7"
    }];
    GlobalTestUser.processTaskData(GlobalTestUser.data);
    let testDaily=GlobalTestUser.dailies.get("Daily 1")
    let checkName="Daily 1"===testDaily.name
    let checkUser=GlobalTestUser===testDaily.user
    let checkId="29da4058-a00b-46b1-bb98-98c583d670a7"===testDaily.id
    console.log(testDaily)
    let checkNote="[comment]:#(CHANGE:testChange,2022-09-06)"===testDaily.notes
    let checkdueDates=true
    let count = 0;
    testDaily.dueDates.forEach((e)=>{

        let testDueDates=[
            true,
            false,
            true,
            true,
            false,
            true,
            true
        ]
        if(testDueDates[count]!==e){
            checkdueDates=false
        }
        count++;
    })
    let checkTaskChange=testDaily.TaskChanges.get('testChange')!==undefined
    let checkHistory=testDaily.history.size===3
    console.log("StartDate",testDaily.startDate)
    let checkStartDate=testDaily.startDate.toLocaleDateString()==="11/6/2022"
    console.log(checkTaskChange,checkNote,checkHistory,checkUser,checkdueDates,checkId,checkName,checkStartDate)
    expect(checkHistory&&checkName&&checkUser&&checkId&&checkNote&&checkdueDates&&checkTaskChange&&checkStartDate).toBe(true);
})
test("ProcessTasksData Function-Process habit", async () => {
    await GlobalTestUser.getTasksData();
    GlobalTestUser.data=[{
        "challenge": {},
        "group": {
            "completedBy": {},
            "assignedUsers": []
        },
        "up": true,
        "down": true,
        "counterUp": 0,
        "counterDown": 0,
        "frequency": "daily",
        "history": [
            {
                "date": 1668022567108,
                "value": 4.255940168063077e-7,
                "scoredUp": 1,
                "scoredDown": 1
            }
        ],
        "type": "habit",
        "notes": "[comment]:#(CHANGE:testChange,2022-09-06)",
        "tags": [],
        "value": 4.255940168063077e-7,
        "priority": 1,
        "attribute": "str",
        "byHabitica": false,
        "reminders": [],
        "createdAt": "2022-11-09T19:35:54.325Z",
        "updatedAt": "2022-11-14T01:44:07.342Z",
        "_id": "b92eab77-a6f2-4e91-9f23-009291fd3292",
        "text": "testHabit",
        "userId": "46f25f19-78f0-4703-a729-6bb75e72aff0",
        "id": "b92eab77-a6f2-4e91-9f23-009291fd3292"
    }];
    GlobalTestUser.processTaskData(GlobalTestUser.data);
    let testHabit=GlobalTestUser.habits.get("testHabit")
    let checkName="testHabit"===testHabit.name
    let checkUser=GlobalTestUser===testHabit.user
    let checkId="b92eab77-a6f2-4e91-9f23-009291fd3292"===testHabit.id
    console.log(testHabit)
    let checkNote="[comment]:#(CHANGE:testChange,2022-09-06)"===testHabit.notes
    let checkTaskChange=testHabit.TaskChanges.get('testChange')!==undefined
    let checkHistory=testHabit.history.size===1
    let checkStartDate=testHabit.startDate.toLocaleDateString()==="11/9/2022"
    console.log(checkTaskChange,checkNote,checkHistory,checkUser,checkId,checkName,checkStartDate)
    expect(checkHistory&&checkName&&checkUser&&checkId&&checkNote&&checkTaskChange&&checkStartDate).toBe(true);
})



