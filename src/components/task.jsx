import styled from 'styled-components'

const Component = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 4px;
    border-radius: 4px;
    padding: 4px;
`
const Title = styled.h4`
    margin: 0;
`
const Content = styled.p`
    margin: 0;
    padding-left: 5px;
`

const Task = ({task}) => {

    return (
        <Component>
            <Title>
                {task.id}
            </Title>
            <Content>{task.content}</Content>
            
            
        </Component>
    )
}

export default Task