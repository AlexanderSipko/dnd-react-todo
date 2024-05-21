import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const Handle = styled.div`
  width: 5px;
  height: 5px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${props => props.isDragging ? 'orange' : 'lightgray'};
  opacity: ${props => props.isDragging ? '1' : '0.5'};
  margin-right: 10px;
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id.toString()}
        index={this.props.index}
        
      >
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Handle {...provided.dragHandleProps} isDragging={snapshot.isDragging}/>
            <div>
              <h4>{this.props.task.id}</h4>
              {this.props.task.content}
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}