function generateMovingAverageList(l){
    let movingAccumulator=[]
    for(let i=0.0;i<l.length;i++){
        if(i === 0){
            movingAccumulator.push(l[0])
        }else{
            let oldAverage=(i)*(movingAccumulator[i-1]/(i+1))
            movingAccumulator.push(oldAverage+(l[i]/(i+1)))
        }
        console.log(i,l[i])
    }
    return movingAccumulator
}
export default generateMovingAverageList