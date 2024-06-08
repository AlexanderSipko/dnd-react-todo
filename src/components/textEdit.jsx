import React, { useState, useMemo, useEffect, useRef } from 'react';
import {styled, keyframes} from 'styled-components';
import {InitialTaskList} from '../assets/initial-data'
import { loadFromStorage, saveToStorage } from '../Logic/loadSaveStorage';

const AddTask = styled.div`
    margin-left: 5px;
    color: #000000;
    opacity: 0.4;
    cursor: pointer;
    &:hover {
        /* color: #8c8c8c; */
        opacity: 0.8;
    }
`
const AddTasksList = styled.div`
    min-height: 130%;
    /* width: 100%; */
    border-radius: 0px 0px 6px 6px;
    margin: 2px 5px 2px 0;
    padding: 4px;
    box-sizing: border-box;
    border-top: 1px solid lightgrey;
    overflow: scroll;
    max-height: 250px;
`
const WrapperInput = styled.div`
    display: grid;
    grid-template-columns: 10px auto 10px;
    align-content: center;
    grid-gap: 6px;
    /* padding-right: 8px; */
    
`
const InputText = styled.textarea`
    outline: none;
    border: none;
    background: #f8f8f8;
    border-radius: 4px;
    color: gray;
    padding: 1px 2px 1px 5px;
    resize: none;
    white-space: break-spaces;
    /* max-height: max-content; */
    
    /* height: 225px; */
    /* height: max-content; */
    /* height: 16px; */
    /* min-height: 30px; */
    /* max-height: 160px; */
`
const InputTextDone = styled.textarea`
    outline: none;
    border: none;
    background: #e5f8e9;
    border-radius: 4px;
    color:  #bdbdbd;
    padding: 1px 2px 1px 5px;
    resize: none;
    white-space: break-spaces;
    text-decoration: line-through;
`
const Icons = styled.span`
    opacity: 0.2;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
        color: red;
    }
    /* size: 10px; */
`
const IconsAdd = styled.span`
    margin-right: 5px;
`
const IconsDone = styled.span`
    opacity: 0.2;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
        color: green;
    }
/* size: 10px; */
`
const WrapperIcons = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    justify-content: space-around;
`
const HorizontalBorder = styled.div`
    margin-bottom: 2px;
    border-bottom: 0.2px dashed #418441;
    margin-top: 2px;
`
const BlockTasksList = {
    initialContent:undefined,
    taskInitialList:undefined,

    // convertKeyToString (taskObject) {
    //     this.initialContent = {}
    //     for (const key in taskObject) {
    //         this.initialContent[key] = taskObject[key];
    //       }
    // },

    create (initialContent, taskId) {
        if (typeof(initialContent) === 'object') {
            this.initialContent = initialContent
            this.taskInitialList = this.initialContent[taskId]
            return initialContent
        } else {
            return undefined;
        }
    }
}

const CountTask = styled.div`
    color: ${props => (props.$show ? 'gary' : '#d8d4d4')};
    font-size: 12px;
    display: grid;
    grid-template-columns: 25px auto 35px;
    align-content: center;
    align-items: center;
    grid-gap: 1px;
    cursor: pointer;
    /* padding-right: 8px; */
    span:last-child {
        display: flex;
        justify-content: flex-end;
    }
`

const AddNewTask = ({task_id, tasksList, setInitialContent, setShow}) => {
    const addTask = () => {
        let currentTaskList = tasksList[task_id]
        if (currentTaskList !== undefined) {
            currentTaskList.push({id: task_id + '-' + (currentTaskList.length + 1), value: '', done: false})
        } else {
            currentTaskList = [{id: task_id + '-' + 1, value: '', done: false}]
        }
        const newTaskList = {...tasksList, [task_id]:currentTaskList}
        setInitialContent(newTaskList)
        setShow(true)
    }
    return (
        <AddTask onClick={() => {addTask()}}>
            <IconsAdd>✏️</IconsAdd>
             + добавить задачу
        </AddTask>
        
    )
}

const TextEditor = ({taskId}) => {
    const [initialContent, setInitialContent] = useState("loading");
    const [show, setShow] = useState(false);

    useEffect(() => {
        loadFromStorage().then((content) => {
            if (content === undefined) {
                // console.log('TODO')
                setInitialContent(InitialTaskList);
                saveToStorage(InitialTaskList)
            } else {
                setInitialContent(content);
            }
        });
    }, []);

    useEffect(() => {
        if (initialContent !== 'loading') {
            saveToStorage(initialContent)
        }
    }, [initialContent]);

    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return undefined;
        }
        return true
    }, [initialContent]);
 
    if (editor === undefined) {
        return "Loading task...";
    }
    // console.log(taskId)

    if (initialContent[taskId] === undefined) {
        return <AddNewTask
                    task_id={taskId}
                    tasksList={initialContent}
                    setInitialContent={setInitialContent}
                    setShow={setShow}
                />
    }
    
    return (
        <>
        <AddNewTask 
            task_id={taskId} 
            tasksList={initialContent}
            setInitialContent={setInitialContent}
            setShow={setShow}
        />
            <AddTasksList>
            <InputAreaPure
                    // key={taskINlist.id}
                taskId={taskId}
                setInitialContent={setInitialContent}
                initialContent={initialContent}
                show={show}
                setShow={setShow}
            />
        </AddTasksList>
        </>
        
    )
}

export default TextEditor

class InputAreaPure extends React.PureComponent {

    countDoneStatus (taskList) {
        const allTasks = taskList.length
        const doneTasks = taskList.filter(task => task.done).length
        const percent = ((doneTasks / allTasks) * 100).toFixed(0);
        // return `${doneTasks}/${allTasks} - ${percent}%`
        return <><span>{doneTasks}/{allTasks}</span>
        <div style={{'background':'#ececec', 'height':'5px', 'borderRadius':'2px'}}>
            <div style={{'background':(percent >= 100 ? 'green' : '#ff938d'), 'height':'5px', 'borderRadius':'2px', 'width': percent + '%'}}></div>
        </div>
        
        <span>{percent} %</span></>
    }

    render() {
    
      return <>
                <CountTask
                    $show={this.props.show}
                    onClick={() => {
                    // this.setState({show:!this.state.show});
                    this.props.setShow(prev => !prev)
                }}>{this.countDoneStatus(this.props.initialContent[this.props.taskId])}</CountTask>
                    {this.props.show && this.props.initialContent[this.props.taskId].map((taskINlist, index) => (
                        <InputArea key={taskINlist.id}
                            index={index}
                            taskId={this.props.taskId}
                            taskINlist={taskINlist}
                            setInitialContent={this.props.setInitialContent}
                        />
                    ))}
            </>
    }
  }


const InputArea = ({index, taskId, taskINlist, setInitialContent}) => {
    // console.log(taskINlist)
    const [ value , setValue ] = useState(taskINlist.value)
    const [ rows , setRows ] = useState(1)

    const handlerOnChange = (value) => {
        setValue(value)
        setInitialContent(previous => {
            const newTasks = previous
            newTasks[taskId][index].value = value
            return  {...newTasks}
        })
        setRows(value.split('\n').length + 1)
    }

    const changeStatus = (done) => {
        setInitialContent(previous => {
            const newTasks = previous
            newTasks[taskId][index].done = done
            return  {...newTasks}
        })
    }

    const deleteTask = () => {
        setInitialContent(previous => {
            const newTasks = previous
            if (newTasks[taskId].length === 1) {
                delete previous[taskId]
            } else {
                newTasks[taskId].splice(index, 1)
            }
            return  {...newTasks}
        })
    }

    return (
        <>
            <WrapperInput>
                
                <WrapperIcons>
                    {taskINlist.done ?
                        <Icons onClick={() => {changeStatus(false)}}>✅</Icons> :
                        value.length > 0 ? 
                        <IconsDone onClick={() => {changeStatus(true)}}>v</IconsDone>:
                        <span></span>
                    }
                </WrapperIcons>
                {taskINlist.done ?
                    <InputTextDone
                        rows={rows}
                        value={value}
                        onDoubleClick={() => {
                            rows === 1 ? setRows(value.split('\n').length): setRows(1)}
                        }
                        readOnly>
                    </InputTextDone>:
                    <InputText
                        rows={rows}
                        value={value}
                        spellcheck="true"
                        onDoubleClick={() => {
                            rows === 1 ? setRows(value.split('\n').length): setRows(1)}
                        }
                        onChange={(e) => {handlerOnChange(e.target.value)}}>
                    </InputText>
                }
                <WrapperIcons>
                    <Icons onClick={() => {deleteTask()}}>x</Icons>
                </WrapperIcons>
            </WrapperInput>
            <HorizontalBorder/>
        </>
        
    )
}