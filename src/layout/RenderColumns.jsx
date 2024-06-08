import React from 'react';

import styled from 'styled-components';
// import '@atlaskit/css-reset';
import Column from '../components/column';

const Container = styled.div`
  display: flex;
`;

class RenderColumn extends React.PureComponent {

  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column 
                column={column} 
                tasks={tasks} 
                index={index} 
                handlerAddTask={this.props.handlerAddTask} 
                columnEffect={this.props.columnEffect}
                changeStar={this.props.changeStar}
                changeColor={this.props.changeColor}
            />;
  }
}


const RenderColumns = ({props}) => {

    return (
        <Container {...props.providedDraggableProps} ref={props.providedInnerRef}>
                {props.columnOrder.map((columnId, index) => {
                const column = props.columns[columnId];
                // const isDropDisabled = false // index < this.state.homeIndex;
            return (
              <RenderColumn
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={props.tasks}
                    handlerAddTask={props.handlerAddTask}
                    columnEffect={props.columnEffect}
                    changeStar={props.changeStar}
                    changeColor={props.changeColor}
                  />
            );
          })}
         {props.providedPlaceholder}
        </Container>
    )
}


export default RenderColumns




