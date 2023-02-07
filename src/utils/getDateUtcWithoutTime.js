/**
 * This function receives a Date object and return a string with the format yyyy-mm-dd .
 * @param {Date}date
 * @return {String}
 */
function getDateUtcWithoutTime(date){
    let month=date.getMonth()+1
    let day=date.getDate()
    if(month < 10) {
        month= "0" + month;
    }
    if(day < 10) {
        day= "0" + day;
    }
    return date.getFullYear()+"-"+(month)+"-"+day;
}export default getDateUtcWithoutTime

