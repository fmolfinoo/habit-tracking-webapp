/**
 * This function take a probability that is on scale 0 to 1 transform it to scale 0-100 and add the % symbol
 * @param number
 * @return {string}
 */
export function numToPercentage(number){
    return (number*100.0).toFixed(2)+"%"
}