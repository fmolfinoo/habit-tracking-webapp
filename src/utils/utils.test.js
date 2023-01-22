import recreateUser from "./recreateUser";
import {user} from "../user";
import {daily, habit} from "../task";
import mapGetTypeList from "./mapGetTypeList";
test("mapGetTypeList function",() => {
    let map=new Map()
    map.set("a",new Date(2023,10,1))
    map.set("b",new habit("a",undefined,"hola","",[],""))
    map.set("c",new daily("test",undefined,"1234",[],"",[],"2022-10-30"))
    let habitList=mapGetTypeList(map,"habit")
    console.log(habitList)
    expect(habitList.length===1).toBe(true)

})