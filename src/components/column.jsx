import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableTask from './task';



const Container = styled.div`
  margin: 8px 4px 8px 8px;
  max-height:95vh;
  overflow: overlay;
  border: 1px solid lightgrey;
  border-radius: 12px;
  /* width: 72mm; */
  width: 90mm;
  height: max-content;
  display: flex;
  flex-direction: column;
  background-color: ${({ $isDragging }) => ($isDragging ?  '#f5efc2' : '#f1f2f4')};
  transition: background-color 0.2s ease;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
`
const Title = styled.h3`
position:relative;
  padding: 4px 0 0 5px;
  /* width: 100%; */
`;

const StatusName = styled.span`
  padding: 2px 0 0 0;
  font-size: 14px;
  text-align: right;
  color:  ${({ $isDragging }) => ($isDragging ?  'black' : 'gray')};
  transition: color 0.2s ease;
`;

const CountEffect = styled.div`
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 12px;
  opacity: 0.6;
`

const TaskList = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: ${({ $isDraggingOver }) => ($isDraggingOver ? '#d0f8cd' : '#f1f2f4')};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 50px;
  height: max-content;
  border-radius: 12px;
`;

class InnerTask extends React.PureComponent {

  
  render() {
    return this.props.tasks.map((task, index) => {
      return <DraggableTask key={task.id} task={task} index={index} changeStar={this.props.changeStar} changeColor={this.props.changeColor} 
      columnId={this.props.columnId}/>
    })
  }
}

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
              <StatusName $isDragging={snapshot.isDragging}>
                {this.props.column.title} 
              </StatusName>
              <CountEffect>
                 {this.props.tasks.length > 0 && this.props.columnEffect[this.props.column.id] > 0 && `задач ${this.props.tasks.length} эффект ${this.props.columnEffect[this.props.column.id]}`}
                 {this.props.tasks.length > 0 && this.props.columnEffect[this.props.column.id] === 0 && `задач ${this.props.tasks.length}`}
              </CountEffect>
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
              <InnerTask tasks={this.props.tasks} changeStar={this.props.changeStar}
              changeColor={this.props.changeColor}
              columnId={this.props.column.id}/>
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
            // width:'97%', 
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