
import TaskCard from '../components/TaskCard'
function TaskList({tasks}){
    return (
        <div className="grid grid-cols-3 gap-4">
            {
                tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))
            }
        </div>
    )
}
export default TaskList