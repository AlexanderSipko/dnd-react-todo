import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  width: 33%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 6px;
`;

const Count = styled.span`
  padding: 0px;
  color: lightgrey;
`;

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'whitesmoke' : 'white'};
  flex-grow: 1;
  min-height: 100px;
  /* height: max-content; */
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>
            {this.props.column.title} <Count>{this.props.tasks.length}</Count>
        </Title>
        
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
