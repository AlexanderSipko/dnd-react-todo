import {DragDropContext} from 'react-beautiful-dnd'
import Column from './column'

const Tasks1 = ({tasksArray}) => {

    const onDragEnd = () => {
        // TODO reorder our column
        console.log('onDragEnd')
    }
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            
            {tasksArray.columnOrder.map((columnId) => {
                const column = tasksArray.columns[columnId]
                const tasks = column.taskIds.map(taskId => tasksArray.tasks[taskId])
                return <Column key={column.id} column={column} tasks={tasks} />
            })}
        </DragDropContext>
    )
}

export default Tasks1
