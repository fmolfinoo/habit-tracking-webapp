import "../pages/css/table.css"
import {numToPercentage} from "../utils/numToPercentage";
function HabitsTable(user){
    let habitsTable=[];
    for(let e of user.user.habits.values()){
        console.log(e)
        habitsTable.push(<HabitsTableRow task={e}/>)
    }
    return(
        <table class={"Habit-Table"}>
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
            {habitsTable}
        </table>
    )

}
function HabitsTableRow(task){
    const totalDaysSinceCreation=task.task.getTotalDaysSinceStart()
    return (
        <tr>
        <td>{task.task.name}</td>
        <td>{task.task.startDate.toLocaleDateString()}</td>
        <td>{totalDaysSinceCreation}</td>
            <HabitCellFormat data={task.task.getAverage(7)}/>
            <HabitCellFormat data={task.task.getAverage(14)}/>
            <HabitCellFormat data={task.task.getAverage(30)}/>
            <HabitCellFormat data={task.task.getAverage(90)}/>
            <HabitCellFormat data={task.task.getAverage(180)}/>
            <HabitCellFormat data={task.task.getAverage(365)}/>
            <HabitCellFormat data={task.task.getAverage(totalDaysSinceCreation)}/>
    </tr>)
}
function HabitCellFormat(data){
    console.log("data",data)
    return <td>&#129045;{data.data.Positive.toFixed(2)}&#129047;{data.data.Negative.toFixed(2)}</td>
}
export default HabitsTable