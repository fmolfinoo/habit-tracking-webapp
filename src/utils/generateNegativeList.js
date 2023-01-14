function generateNegativeList(l){
    let negAccumulator=[]
    for(let i=0;i<l.length;i++){
        negAccumulator[i]=-l[i]
    }
    return negAccumulator
}
export default generateNegativeList