import {user} from "../user";

const GlobalTestUser = new user("disposable.17316@aleeas.com", "EpC8Y5XkqRKT2H");
beforeAll(async ()=>{
    await GlobalTestUser.login();
    let data = await GlobalTestUser.getTasksData();
    GlobalTestUser.processTaskData(data);
})
