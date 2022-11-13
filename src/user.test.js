import {user} from "./user";
import login from "./pages/login";
const GlobalTestUser = new user("disposable.17316@aleeas.com", "EpC8Y5XkqRKT2H");
beforeAll(async ()=>{
    await GlobalTestUser.login();
})
test("Login function",async () => {
    let testUser=new user("disposable.17316@aleeas.com","EpC8Y5XkqRKT2H")
    let test = async () => {
        let respond = await testUser.login()
        if (respond && testUser.id !== undefined && testUser.apiToken !== undefined) {
            return true;
        } else {
            return false;
        }
    }
    let result = await test();
    expect(result).toBe(true)
})

test("getTasksData Function",async () => {
    let test = async () => {
        let respond = await GlobalTestUser.getTasksData();
        console.log(respond)
        return respond !== "";
    }
    let result = await test();

    expect(result).toBe(true)
})
test("ProcessTasksData Function", async () => {
    let data = await GlobalTestUser.getTasksData();
    GlobalTestUser.processTaskData(data);
    console.log(GlobalTestUser.dailies);
    console.log(GlobalTestUser.habits);
    expect(GlobalTestUser.dailies.length!==0&&GlobalTestUser.habits.length!==0).toBe(true);
})
