import "../../pages/css/table.css"
import mapGetTypeList from "../../utils/mapGetTypeList";
import {daily, habit} from "../../task";
function HabitsTable({user}){
    let habitsTable=[];
    let tempHabit=new habit("test",undefined,"1234","",[],"2022-10-30");
    for(let e of mapGetTypeList(user.tasks,tempHabit)){
        habitsTable.push(<HabitsTableRow key={e.name} task={e}/>)
    }
    return(
        <table className={"Habit-Table"}>
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
                {habitsTable}
            </tbody>
        </table>
    )

}
function HabitsTableRow({task}){
    const totalDaysSinceCreation=task.getTotalDaysSinceStart()
    return (
        <tr>
        <td>{task.name}</td>
        <td>{task.startDate.toLocaleDateString()}</td>
        <td>{totalDaysSinceCreation}</td>
            <HabitCellFormat data={task.getAverage(7)}/>
            <HabitCellFormat data={task.getAverage(14)}/>
            <HabitCellFormat data={task.getAverage(30)}/>
            <HabitCellFormat data={task.getAverage(90)}/>
            <HabitCellFormat data={task.getAverage(180)}/>
            <HabitCellFormat data={task.getAverage(365)}/>
            <HabitCellFormat data={task.getAverage(totalDaysSinceCreation)}/>
    </tr>)
}
function HabitCellFormat({data}){
    return <td>⬆{data.Positive.toFixed(2)}⬇{data.Negative.toFixed(2)}</td>
}
export default HabitsTable