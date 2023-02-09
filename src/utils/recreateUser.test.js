import {user} from "../user";
import recreateUser from "./recreateUser";
//you need to add your own user and password to test it
const GlobalTestUser = new user("user", "pass");
beforeAll(async ()=>{
    await GlobalTestUser.login();
    await GlobalTestUser.getTasksData();
    await GlobalTestUser.processTaskData(GlobalTestUser.data);
    window.sessionStorage.clear()
    window.sessionStorage.setItem("user",JSON.stringify(GlobalTestUser))
})
test("recreateUser-Passing a user object",() => {
    let user=recreateUser(GlobalTestUser)
    expect(user===GlobalTestUser).toBe(true)
})
test("recreateUser-Passing a generic object",() => {
    let user=recreateUser(Object)
    expect(user.constructor.name==="user").toBe(true)
})
