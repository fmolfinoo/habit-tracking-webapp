/**
 * This function receives a Date object and return a string with the format yyyy-mm-dd .
 * @param {Date}date
 * @return {String}
 */
function getDateUtcWithoutTime(date){
    let month=date.getUTCMonth()+1
    if(month < 10) {
        month= "0" + month;
    }
    return date.getUTCFullYear()+"-"+(month)+"-"+date.getUTCDate();
}export default getDateUtcWithoutTime

