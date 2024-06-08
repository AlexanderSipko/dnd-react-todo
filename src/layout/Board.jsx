import React from 'react';

import styled from 'styled-components';
import '@atlaskit/css-reset';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RenderColumns from './RenderColumns';
import { loadFromStorage, saveToStorage } from '../Logic/loadSaveStorage';
import demoApiDashboard from '../Logic/apiDashboard'

const KEY_PREFIX = '-t'

const apiDashboard = demoApiDashboard

const Container = styled.div`
  display: flex;
`;


class Board extends React.Component {

  state = null

  handleUpdateState = (response) => {
    this.setState(response);
  };

  componentDidMount() {
    apiDashboard.dispatchTask(
        'getAllTask',
        this.handleUpdateState
      )
  }
  
  changeStar = (type, taskID, startIndex) => {
    const updateTask = this.state.tasks[taskID]
    updateTask.star.value = startIndex
    const _data = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [taskID]: updateTask,
      }
    }
    apiDashboard.dispatchTask(
      'updateTasks',
      this.handleUpdateState,
      _data
    )
  }

  changeColor = (taskID, filed, color) => {
    // console.log(startIndex)
    const updateTask = this.state.tasks[taskID]
    // console.log(type)
    updateTask[filed].value = color
    const _data = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [taskID]: updateTask,
      }
    }
    apiDashboard.dispatchTask(
      'updateTasks',
      this.handleUpdateState,
      _data
    )
  }
  
  handlerAddTask = (taskName) => {
    const t_number_task  = Object.keys(this.state.tasks).length + 1

    const newTask = {
      id: `t-${t_number_task}`,
      name: {value:taskName},
      unique_number:{value:'t-'+t_number_task},
      division_name:{value:'Малая автоматизация'},
      description:{value:''},
      task_doer_user_text:{value:''},
      task_create_user:{value:'Эту задачу создал ты'},
      status:{value:'-'},
      date_expected:{value:'2024'},
      effective_expected:{value:0},
      star:{value:0},
      show:{value:false},
      color:{value:'gray'}
    };
    const _data = {
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
    apiDashboard.dispatchTask(
      'updateTasks',
      this.handleUpdateState,
      _data
    )
  };
  
  onDragStart = start => {
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.handleUpdateState({homeIndex})
  };

  onDragEnd = result => {
    this.handleUpdateState({homeIndex:null})
    const { destination, source, draggableId, type } = result;
    if (!destination) {return;}

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; }

    if (type === 'column') {
        const newColumnOrder = Array.from(this.state.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0,draggableId)
        
        const _data = {
            ...this.state,
            columnOrder: newColumnOrder
        }
        apiDashboard.dispatchTask(
          'updateOrder',
          this.handleUpdateState,
          _data
        )
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

      const _data = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };
      apiDashboard.dispatchTask(
        'updateOrder',
        this.handleUpdateState,
        _data
      )
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

    const _data = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    apiDashboard.dispatchTask(
      'updateTasks',
      this.handleUpdateState,
      _data
    )
  };

  render() {
    if (!this.state) {
      return <>Load</>
    }
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
              columnEffect:this.state.columnEffect,
              changeStar:this.changeStar,
              changeColor:this.changeColor
          }
            return <RenderColumns props={props}/>
          }}
            
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Board


