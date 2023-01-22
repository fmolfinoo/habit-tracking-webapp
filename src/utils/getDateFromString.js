/**
 *This function receives a string date with the following forms as input (Year-Month-Day) and return a Date object
 * @param {String}stringDate
 *
 */
function getDateFromString(stringDate){
    if(stringDate.constructor.name==="Date"){
        return stringDate
    }
    let splitDate=stringDate.split("-")
    //This using numbers instead of strings fix the problem where javascript change the date to account for difference in timezone
    return new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
}export default getDateFromString