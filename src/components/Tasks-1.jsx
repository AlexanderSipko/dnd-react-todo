import Column from './column'

const Tasks1 = ({tasksArray}) => {


    return (
        <>{tasksArray.columnOrder.map((columnId) => {
            const column = tasksArray.columns[columnId]
            const tasks = column.taskIds.map(taskId => tasksArray.tasks[taskId])
            return <Column key={column.id} column={column} tasks={tasks} />
        })}-</>
    )
}

export default Tasks1
