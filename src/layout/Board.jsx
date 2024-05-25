import React from 'react';

import styled from 'styled-components';
import '@atlaskit/css-reset';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RenderList from './InnerList';

const Container = styled.div`
  display: flex;
`;


const countEffect = (newState, setState) => {
  let newEffect = Object.fromEntries(newState.columnOrder.map(item => [item, 0]))
  // console.log(Object.fromEntries(newState.columnOrder.map(item => [item, 0])))
  newState.columnOrder.map(column => {
    const orderTasks = newState.columns[column].taskIds
    orderTasks.map(task => {
      newEffect[column] = newState.tasks[task].effective_expected.value + newEffect[column]
    })
  })
  return {...newState, columnEffect:newEffect}
}

class Board extends React.Component {
  state = countEffect(this.props.tasksArray)

  changeStar = (type, taskID, startIndex) => {
    // console.log(startIndex)
    const updateTask = this.state.tasks[taskID]
    // console.log(type)
    updateTask.star.value = startIndex
    const a = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [taskID]: updateTask,
      }
    }
    this.setState(a);
  }

  changeColor = (taskID, filed, color) => {
    // console.log(startIndex)
    const updateTask = this.state.tasks[taskID]
    // console.log(type)
    updateTask[filed].value = color
    const newTasks = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [taskID]: updateTask,
      }
    }
    this.setState(newTasks);
  }
  
  countEffect = (newState, setState) => {
    let newEffect = Object.fromEntries(newState.columnOrder.map(item => [item, 0]))
    // console.log(Object.fromEntries(newState.columnOrder.map(item => [item, 0])))
    newState.columnOrder.map(column => {
      const orderTasks = newState.columns[column].taskIds
      orderTasks.map(task => {
        newEffect[column] = newState.tasks[task].effective_expected.value + newEffect[column]
      })
    })
    setState({...this.state, columnEffect:newEffect})
  }
  
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
      // this.countEffect(newState)
      this.setState(countEffect(newState));
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
    // this.countEffect(newState)
    this.setState(countEffect(newState));
  };

  handlerAddTask = (taskName) => {
    const t_number_task  = Object.keys(this.state.tasks).length + 1

    const newTask = {
      id: `t-${t_number_task}`,
      name: {value:taskName},
      unique_number:{value:'t-'+t_number_task},
      division_name:{value:'Малая автоматизация'},
      description:{value:'нет описания'},
      task_doer_user_text:{value:''},
      task_create_user:{value:'Эту задачу создал ты'},
      status:{value:'-'},
      date_expected:{value:'2024'},
      effective_expected:{value:0},
      star:{value:0},
      show:{value:false},
      color:{value:'gray'}
    };
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
    
    this.setState(countEffect(a));
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId='all-column' direction='horizontal' type='column'
        >
          {(provided) => {

          
            const props = {
              providedDraggableProps:provided.draggableProps,
              providedInnerRef:provided.innerRef,
              providedPlaceholder:provided.placeholder,
              columnOrder:this.state.columnOrder,
              columns:this.state.columns,
              tasks:this.state.tasks,
              // TODO dispatch updateState in tasks
              handlerAddTask:this.handlerAddTask,
              columnEffect:this.countEffect,
              changeStar:this.changeStar,
              changeColor:this.changeColor
          }
            return <RenderList props={props}/>
          }}
            
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Board


