function diffBetweenDays(day1,day2=new Date(Date.now())){
    if(day1.getTime()<day2.getTime()){
        return Math.floor(((day2.getTime()-day1.getTime())/86400000))
    }else{
        return Math.floor(((day1.getTime()-day2.getTime())/86400000))
    }
}
export default diffBetweenDays