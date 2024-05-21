import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id.toString()}
        index={this.props.index}
        
      >
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            
          >
            <h4>{this.props.task.id}</h4>
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}