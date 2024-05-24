import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
  width:100%;
`;


class InnerList extends React.PureComponent {

  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} handlerAddTask={this.props.handlerAddTask} />;
  }
}

class App extends React.Component {
  state = initialData;

  onDragStart = start => {
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    this.setState({
      homeIndex,
    });
  };

  onDragEnd = result => {
    this.setState({
      homeIndex: null,
    });

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
        const newColumnOrder = Array.from(this.state.columnOrder)
        console.log(draggableId)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0,draggableId)
        
        const newState = {
            ...this.state,
            columnOrder: newColumnOrder
        }
        this.setState(newState);
        return null
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    this.setState(newState);
  };

  handlerAddTask = (taskName) => {
    const newTask = { id: `t-${Object.keys(this.state.tasks).length + 1}`, content: taskName };
    const a = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...this.state.columns,
        'column-1': {
          ...this.state.columns['column-1'],
          taskIds: [...this.state.columns['column-1'].taskIds, newTask.id],
        },
      },
      columnOrder: [...this.state.columnOrder],
    }
    // console.log(a)
    this.setState(a);
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId='all-column' direction='horizontal' type='column'

        >
            {(provided) => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(
                    taskId => this.state.tasks[taskId],
                );
                const isDropDisabled = false // index < this.state.homeIndex;
            return (
              <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={this.state.tasks}
                    handlerAddTask={this.handlerAddTask}
                  />
              
            );
            
          })}
         {provided.placeholder}
        </Container>
         
            )}

        
        
        </Droppable>
        
      </DragDropContext>
    );
  }
}

export default App


