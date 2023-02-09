import {user} from "../user";
/*

 */
/**
 * This function takes an object and check if it is of type user if not it will recreate the user from memory and return it.This recreated object that get deleted when the user refresh the page
 * @param User
 * @returns {user|*}
 */
//Used for type checking
const tempUser=new user("","")
function recreateUser(User){
    if(User===undefined||User===null||User.constructor!==tempUser.constructor){
        let userData=JSON.parse(sessionStorage.getItem("user"));
        User=new user(userData.username,userData.password,userData.id,userData.apiToken,userData.data)
        User.processTaskData(User.data)
        console.log("Created User",User)
        return User
    }
    return User
}
export default recreateUser