import diffBetweenDays from "./diffBetweenDays";

test("diffBetweenDays testing",() => {
    let now=new Date(1673820103674)//1/15/2023
    let testDay=new Date(1672549200000)//1/1/2023
    expect(diffBetweenDays(testDay,now)===14&&diffBetweenDays(now,testDay)===14).toBe(true)
})