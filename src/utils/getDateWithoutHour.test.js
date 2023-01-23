import getDateUtcWithoutTime from "./getDateUtcWithoutTime";

test("extractChanges Function-Basic TaskChange retrieval", () => {
    let date=new Date(1674344200043)// date=2023/01/21
    let testDate=getDateUtcWithoutTime(date)
    console.log(testDate.toLocaleDateString(),date.toLocaleDateString())
    let areSameDay=date.getUTCDate()===testDate.getUTCDate()&&date.getUTCFullYear()===testDate.getUTCFullYear()&&date.getUTCMonth()===testDate.getUTCMonth()
    expect(areSameDay&&testDate.getHours()===0&&testDate.getMinutes()===0&&testDate.getSeconds()===0).toBe(true)
})

test("extractChanges Function-Basic TaskChange retrieval", () => {
    let date=new Date(1674344200043)// date=2023/01/21
    let testDate=getDateUtcWithoutTime(date)
    console.log(testDate.toLocaleDateString(),date.toLocaleDateString())
    let areSameDay=date.getUTCDate()===testDate.getUTCDate()&&date.getUTCFullYear()===testDate.getUTCFullYear()&&date.getUTCMonth()===testDate.getUTCMonth()
    expect(areSameDay&&testDate.getHours()===0&&testDate.getMinutes()===0&&testDate.getSeconds()===0).toBe(true)
})