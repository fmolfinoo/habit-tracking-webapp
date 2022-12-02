import {numToPercentage} from "../utils/numToPercentage";
function DailiesTable(user){
    let dailiesTable=[];
    for(let e of user.user.dailies.values()){
        dailiesTable.push(<DailiesTableRow task={e}/>)
    }
    return(
        <table class={"Dailies-Table"}>
            <tr>
                <th>Task Name</th>
                <th>Start Day</th>
                <th>Days Since Creation</th>
                <th>1 Week Average</th>
                <th>2 Week Average</th>
                <th>1 Month Average</th>
                <th>3 Month Average</th>
                <th>6 Month Average</th>
                <th>1 Year Average</th>
                <th>Average Since Creation</th>
            </tr>
            {dailiesTable}
        </table>
    )

}
function DailiesTableRow(task){
    const totalDaysSinceCreation=task.task.getTotalDaysSinceStart()
    return (<tr>
        <td>{task.task.name}</td>
        <td>{task.task.startDate.toLocaleDateString()}</td>
        <td>{totalDaysSinceCreation}</td>
        <td>{numToPercentage(task.task.getAverage(7))}</td>
        <td>{numToPercentage(task.task.getAverage(14))}</td>
        <td>{numToPercentage(task.task.getAverage(30))}</td>
        <td>{numToPercentage(task.task.getAverage(90))}</td>
        <td>{numToPercentage(task.task.getAverage(180))}</td>
        <td>{numToPercentage(task.task.getAverage(365))}</td>
        <td>{numToPercentage(task.task.getAverage(totalDaysSinceCreation))}</td>
    </tr>)
}
export default DailiesTable