import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  width: 33%;
  display: flex;
  flex-direction: column;
  background-color: ${({ $isDragging }) => ($isDragging ?  '#f5efc2' : 'white')};
  transition: background-color 0.2s ease;
`
const Title = styled.h3`
  padding: 6px;
  /* width: 100%; */
`;

const Count = styled.span`
  padding: 4px;
  font-size: 16px;
  text-align: right;
  color:  ${({ $isDragging }) => ($isDragging ?  'black' : 'lightgray')};
  transition: color 0.2s ease;
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${({ $isDraggingOver }) => ($isDraggingOver ? '#f0f0f0' : 'white')};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  height: max-content;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container 
            ref={provided.innerRef}
            {...provided.draggableProps}
            $isDragging={snapshot.isDragging}
            >
        <Title {...provided.dragHandleProps} >
            {this.props.column.title} 
            <Count $isDragging={snapshot.isDragging}>
              {this.props.tasks.length}
              </Count>
        </Title>
        
        <Droppable 
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled} 
          type='Задача'
        >
          {(provided, snapshot) => (
            <TaskList
              {...provided.droppableProps}
              ref={provided.innerRef}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
              
            </TaskList>
          )}
        </Droppable>
        {!snapshot.isDragging && 
        <AddTask column={this.props.column.id} handlerAddTask={this.props.handlerAddTask} />}
      </Container>


        )}
      
      
      </Draggable>
    );
  }
}

const AddTaskContent = styled.div`
  padding: 0;
  margin: 0;
  cursor: pointer;
  ::placeholder {
      color: lightgray;
      /* opacity: 0.7; */
  }
`;


const AddTask = ({column = 'column-1',  handlerAddTask = () => {}}) => {
  
  const [ value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handlerAdd = (e) => {
    if (e.key === 'Enter') {
      handlerAddTask(value)
      setValue('')
    }
  }

  
  if (column === 'column-1') {
    return (
      <AddTaskContent>
        <input
          style={{
            display:'box',
            width:'97%', 
            border:'none',
            borderRadius:'4px',
            outline:'none',
            paddingLeft:'10px',
            cursor:'pointer',
            background:'none'
            // placeholder:''
          }
          }
          type="text" name="" id="" value={value} onChange={onChange}
          onKeyDown={handlerAdd}
          placeholder='добавить задачу'
          />
      </AddTaskContent>
  )
  }

}