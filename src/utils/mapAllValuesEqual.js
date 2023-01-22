/***
 * If all values of the map equal input value return true else it returns false
 * @param value
 * @param {Map}map
 * @returns {boolean}
 */
function mapAllValuesEqual(map,value=false){
    for(let e of map.values()){
        if(e===value){
            continue
        }else{
            return false
        }
    }
    return true
}
export default mapAllValuesEqual