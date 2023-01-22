/**
 * This function receives a Date object and return a clone of the input date without the time.
 * @param {Date}date
 */
function getDateWithoutHour(date){
    return new Date(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate());
}export default getDateWithoutHour

