import React, {useState} from 'react';
import {styled, keyframes} from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { useDoubleTap } from 'use-double-tap';
import Star from '../assets/star.png'
import TextEditor from './textEdit'
// import BlockNote from './blokNotView'

export default class DraggableTask extends React.Component {
  render() {
    const isDragDisabled = this.props.task.unique_number.value === 'disabled_task';
    
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
            <TaskCard provided={provided} snapshot={snapshot} task={this.props.task}
            changeStar={this.props.changeStar}
            changeColor={this.props.changeColor}
            columnId={this.props.columnId}/>
        )}
      </Draggable>
    );
  }
}


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px 0px 0px 6px;
  padding: 8px 0px 2px 8px;
  margin-bottom: 21px;
  background-color: ${({ $isDragging }) => ($isDragging ? 'lightgreen' : 'white')};
  display: flex;
  align-items: center;
  transform: ${({ $isDragging }) => ($isDragging ? 'rotate(-2deg)' : 'none')};
  transition: all 0.2s ease;
`;

const Handle = styled.div`
  border: 0.5px solid gray;
  width: 3px;
  height: 8px;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ $isDragging }) => ($isDragging ? 'orange' : 'lightgray')};
  opacity: ${({ $isDragging }) => ($isDragging ? '1' : '0.5')};
  margin-right: 10px;
  transform: ${({ $isDragging }) => ($isDragging ? 'scale(1.3)' : 'scale(1)')};
  transition: all 0.5s ease-in-out;
`;

const TaskContent = styled.div`
  position: relative;
  width:100%;
`
const TaskIdDate = styled.p`
    position:absolute;
    border-radius: 4px 4px 0px 0px;
    padding: 2px 5px 0px 10px;
    top: -27px;
    right: -1px;
    background-color: ${({ $isDragging }) => ($isDragging ? 'orange' : 'white')};
    font-size: 11px;
    color: ${({ $isDragging }) => ($isDragging ? 'black' : 'gray')};
    border: 1px solid lightgrey;
    border-bottom: 0.5px dashed gray;

    span {
      /* margin: 0px 0px 0px 5px; */
      &:first-child::after {
        content: '-';
      }
      &:first-child::before {
        content: '🆔 ';
        opacity: 0.5;
      }
    }
`

const WrapperTitle = styled.div`
  display: ${props => props.$isAbbreviateText ? 'flex' : 'box'};
  justify-content: flex-start;
    align-items: flex-start;
`

const Tittle = styled.p`
  margin: 0;
  /* text-transform: lowercase; */
  padding: 0 5px 0 0;
  font-weight: bold;
  /* cursor: ${props => (!props.$isNameLength && 'pointer')}; */
`;

const TaskCreatorDoer = styled.div`
  display:${props => props.$isShowUser ? 'box' : 'flex'};
  justify-content: space-between;
  /* text-transform: lowercase; */
  color: #d1a843;
  align-items: center;
  cursor: pointer;
  > p {
    margin: 0 5px 0 15px;
    padding: 0;
    size: 12px;
  }
`

const Department = styled.div`
  color: #8f8f8f;
  text-align: left;
  margin-right: 5px;
  cursor: pointer;
`

const DescribeTask = styled.div`
  max-height: ${props => props.$isShowDescriptions ? '350px' : '10px'};
  overflow:${props => props.$isShowDescriptions && 'auto'};
  background-color: ${props => props.$isShowDescriptions ? '#f0f2f3' : 'wite'};
  cursor: pointer;
  padding:${props => props.$isShowDescriptions ? '5px;' : '5px'};
  color:${props => props.$isShowDescriptions ? 'black' : 'gray'};
  border-radius:5px;
  margin: 4px 4px 4px 0;
  max-width: 98%;
  word-break: break-all;
  white-space: break-spaces;
`

const ImageDiv = styled.div`
  display: flex;
  margin: 2px;
  padding: 2px 0 0 2px;
  border-top: 0.5px solid #c4e4cc;
  max-width: 98%;
  align-items: center;
`

const ImageStar = styled.div`
  cursor: pointer;
  img {
    height:12px;
    opacity: ${props => props.$star ? 1 : 0.2};
    margin: 0 1px 0 1px;
    &:hover {
      transform: scale(1.4) translateY(-2px);
      /* transform: translateY(-2px); */
    }
    transition: all 0.2s ease-in-out;
  }
`

const ImageShow = styled.div`
/* flex-direction: 1; */
  /* flex: 1; */
  /* margin-right: auto; */
  /* cursor: pointer; */
  img {
    margin: 0;
    height:12px;
    opacity: ${props => props.$show ? 1 : 0.2};
    &:hover {
      transform: scale(1.4) translateY(-2px);
      /* transform: translateY(-2px); */
    }
    transition: all 0.2s ease-in-out;
  }
`

const Icons = styled.span`
  opacity: 0.5;
`

const IconsTarget = styled.i`
  /* display: inline; */
  margin: 10px 3px 0 3px;
  padding: 0;
  text-align: center;
  opacity: 0.7;
`

const TaskCard = ({provided={}, snapshot={}, task={}, changeStar, changeColor, columnId}) => {
  const nameLength = 45

  const [displayedTextName, setDisplayedTextName] = useState(task.name.value.slice(0, nameLength));
  const [isAbbreviateText, setIsAbbreviateText] = useState(true);
  const [isShowDescriptions, setIsShowDescriptions] = useState(false);
  const [isShowUser, setIsShowUser] = useState(false);
  const [isShowDemo, setIsShowDemo] = useState(columnId === 'column-3' || columnId === 'column-4');

  const handleMouseEnterName = () => {
    setDisplayedTextName(task.name.value);
  };

  const handleMouseLeaveName = () => {
    setDisplayedTextName(task.name.value.slice(0, nameLength));
  }

  const abbreviateText = (text) => {
    const words = text.split(" ");
    let abbr = "";
    for (let word of words) {
      if (word.length > 1) {
        abbr += word[0].toUpperCase();
      } else {
        abbr += word[0].toLowerCase();
      }
    }
    return abbr;
  }

  const bindTaskDescriptions = useDoubleTap((event) => {
    // Your action here
    task.description.value && setIsShowDescriptions(prev => !prev)
    // console.log('asd')}
  }
  );

  return (
    <div {...provided.draggableProps} ref={provided.innerRef}>
          <Container
              $isDragging={snapshot.isDragging}
              
            >
           {/* <Handle
            {...provided.dragHandleProps} 
            $isDragging={snapshot.isDragging}
           ></Handle> */}
            <TaskContent $isDragging={snapshot.isDragging}>
              <TaskIdDate $isDragging={snapshot.isDragging}>
                <span>{task.unique_number.value}</span>
                <span>{task.id}</span>
                <span {...provided.dragHandleProps}>
                  <IconsTarget>
                    🕢
                  </IconsTarget>
                  {task.date_expected.value}</span>
                <span>
                  <IconsTarget>
                    🎯
                  </IconsTarget>
                  {task.effective_expected.value}
                </span>
              </TaskIdDate>
              <WrapperTitle $isAbbreviateText={isAbbreviateText} >
              <Department onClick={() => {setIsAbbreviateText(prev => !prev)}}>
                {isAbbreviateText ? abbreviateText(task.division_name.value) : task.division_name.value}
              </Department>
              <Tittle
              {...provided.dragHandleProps}
                // onMouseEnter={handleMouseEnterName}
                // onMouseLeave={handleMouseLeaveName}
                // $isNameLength={task.name.value.length < nameLength}
              >
                
                {task.name.value}</Tittle>
              </WrapperTitle>
              
              <DescribeTask
                $isShowDescriptions={isShowDescriptions}
                {...bindTaskDescriptions}
                // onDoubleClick={() => {setIsShowDescriptions(prev => !prev)}}
                >
                
                {task.description.value.length !== 0 && <Icons>📋</Icons>}
                {task.description.value.length === 0 && '❗- нет описания задачи'}

                {isShowDescriptions && task.description.value.length > 0 ? 
                  task.description.value : 
                  task.description.value.slice(0, nameLength/2)}
                  
                </DescribeTask>
                
              <TaskCreatorDoer
                $isShowUser={isShowUser}
                onDoubleClick={() => {setIsShowUser(prev => !prev)}}>
                <p>
                  <Icons>👨‍💼</Icons>
                {task.task_create_user.value}
                </p>
                <p>
                  <Icons>🧑‍💻</Icons>
                {isShowUser? task.task_doer_user_text.value || '...' : task.task_doer_user_text.value.slice(0, nameLength/3)}
                </p>
              </TaskCreatorDoer>
              
              <TextEditor taskId={task.id}/>

              <ImageDiv >
              {[1, 2, 3].map(star => (
                  <ImageStar key={task.id + '_star_' + star} $star={star <= task.star.value} >
                    <img onClick={
                      () => changeStar(
                        star <= task.star.value ? star: star === 0 ? star : star - 1,
                        task.id,
                        star > task.star.value ? star: star === 0 ? star : star - 1)
                      } src={Star}/>
                  </ImageStar>
                ))}
                <div style={{flex: 1}}></div>
              <ImageShow
                // onClick={() => {setIsShowDemo(prev => !prev)}}
                $show={isShowDemo} >
                   {isShowDemo ? <Icons>✨🏆✨</Icons> : <Icons>⏱️</Icons>} 
                  </ImageShow>
              
                  <div style={{flex: 1}}></div>
                  <Tag
                    changeColor={changeColor} color={task.color.value}
                    taskId={task.id}
                    />
                 
              </ImageDiv>
            </TaskContent>
          </Container>
      </div>
  )
}

const TagDiv = styled.div`
  width: 40px;
  display: flex;
    width: 80px;
    align-items:center;
    justify-content: flex-end;
`

const rotateFrames = keyframes`
  0% {
    width: 20px;
    /* align-items: flex-end; */
  }
  50% {
    width: 80px;
  }
  100% {
    width: 20px;
  }
`;

const ColorTeg = styled.div`
  border-radius: 6px;
  height: 8px;
  width: 60px;
  background: ${props => (props.$color)};
  margin: 2px 4px 2px 4px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
      transform: scale(1.1);
    }
  animation: ${props => (props.$isAnimate && (props.$rotateFrames))} 5s ease-in-out infinite;
`

const ColorTegChoice = styled.div`
    /* position:relative; */
    /* border-radius: 10px; */
    width: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CircTag = styled.div`
  border-radius: 10px;
  height: 11px;
  width: 11px;
  background: ${props => (props.$color)};
  margin: 2px 4px 2px 4px;
  opacity: 0.6;

  cursor: pointer;
  &:hover {
      transform: scale(1.8);
      /* transform: translateY(-2px); */
    }
    transition: all 0.2s ease-in-out;
`
const Tag = ({color, changeColor, taskId}) => {

  const colors = ['red', 'green', 'blue', 'gray']

  const [ isPik, setIsPik ] = useState(true)
  // const [ color, setColor ] = useState('red')

  const handlerChangeColor = (color) => {
    changeColor(taskId, 'color', color)
    setIsPik(prev => !prev)
  }

  const bindTaskTag = useDoubleTap((event) => {
    // Your action here
    setIsPik(prev => !prev)}
  );

  return (
    <TagDiv {...bindTaskTag}
    // onDoubleClick={() => {setIsPik(prev => !prev)}}
    >
        {isPik ?
        <>
        <ColorTeg $color={color} $rotateFrames={rotateFrames} $isAnimate={color === 'red'}></ColorTeg>
        {color === 'red' ? <Icons>🔥</Icons> : ''}
        {color === 'green' ? <Icons>🚀</Icons> : ''}
        {color === 'blue' ? <Icons>🗿</Icons> : ''}
        {color === 'gray' ? <Icons>🏄‍♂️</Icons> : ''}
        </>
        :
        <ColorTegChoice>  
        {colors.map(color => (
          <CircTag key={color} onClick={() => {handlerChangeColor(color)}} $color={color}>
            
          </CircTag>
        ))}
        </ColorTegChoice>
        }
    </TagDiv>
  )
}