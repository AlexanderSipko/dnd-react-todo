import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ $isDragging }) => ($isDragging ? 'lightgreen' : 'white')};
  display: flex;
  align-items: center;
  transform: ${({ $isDragging }) => ($isDragging ? 'rotate(-2deg)' : 'none')};
  transition: all 0.2s ease;
`;

const Handle = styled.div`
  border: 0.5px solid gray;
  width: 5px;
  height: 5px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ $isDragging }) => ($isDragging ? 'orange' : 'lightgray')};
  opacity: ${({ $isDragging }) => ($isDragging ? '1' : '0.5')};
  margin-right: 10px;
  transform: ${({ $isDragging }) => ($isDragging ? 'scale(1.3)' : 'scale(1)')};
  transition: all 0.5s ease-in-out;
`;

export default class Task extends React.Component {
  render() {
    // const isDragDisabled = this.props.task.id === 'task-1';
    
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        // isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
         
          <Container
            // {...provided.draggableProps}
            // {...provided.dragHandleProps}
            
            $isDragging={snapshot.isDragging}
            
          >
           <Handle
            {...provided.dragHandleProps} 
            $isDragging={snapshot.isDragging}
           ></Handle>
            <div>
              <h4>{this.props.task.id}</h4>
            {this.props.task.content}
            </div>
          </Container>
          </div>
        )}
      </Draggable>
    );
  }
}
