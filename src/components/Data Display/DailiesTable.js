import {numToPercentage} from "../../utils/numToPercentage";
import mapGetTypeList from "../../utils/mapGetTypeList";
function DailiesTable({user}){
    let dailiesTable=[];
    let n=0;
    for(let e of mapGetTypeList(user.tasks,"daily")){
        dailiesTable.push(<DailiesTableRow key={"d"+n} task={e}/>)
        n++
    }
    return(
        <table className={"Dailies-Table"}>
            <thead>
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
            </thead>
            <tbody>
                {dailiesTable}
            </tbody>
        </table>
    )

}
function DailiesTableRow({task}){
    const totalDaysSinceCreation=task.getTotalDaysSinceStart()
    return (
        <tr>
        <td>{task.name}</td>
        <td>{task.startDate.toLocaleDateString()}</td>
        <td>{totalDaysSinceCreation}</td>
        <td>{numToPercentage(task.getAverage(7))}</td>
        <td>{numToPercentage(task.getAverage(14))}</td>
        <td>{numToPercentage(task.getAverage(30))}</td>
        <td>{numToPercentage(task.getAverage(90))}</td>
        <td>{numToPercentage(task.getAverage(180))}</td>
        <td>{numToPercentage(task.getAverage(365))}</td>
        <td>{numToPercentage(task.getAverage(totalDaysSinceCreation))}</td>
    </tr>)
}
export default DailiesTable