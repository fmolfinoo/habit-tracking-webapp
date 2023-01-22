/***
 *  Given a map and a classname as a string we return the list of all the elements of the map that are of that class
 * @param {Map}map
 * @param {String} type
 * @returns {*[]}
 */
function mapGetTypeList(map,type){
    let accumulator=[]
    for(let e of map.values()){
        if(e.constructor.name===type){
            accumulator.push(e)
        }
    }
    return accumulator
}
export default mapGetTypeList