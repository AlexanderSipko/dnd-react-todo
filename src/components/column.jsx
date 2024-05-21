import styled from 'styled-components'
import Task from './task'

const Component = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 4px;
`
const Title = styled.h3`
    padding: 8px;    
`
const TaskList = styled.div`
    padding: 8px;
`

const Column = ({column, tasks}) => {

    console.log(tasks)
    return (
        <Component>
            <Title>{column.title}</Title>
            <TaskList>
                {tasks.map(task => {
                    return <Task key={task.id} task={task}/>
                })}
            
            </TaskList>
        </Component>
        
    )
}

export default Column