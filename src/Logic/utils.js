

export const countColumnsEffect = (tasksData) => {
    // расчет суммы эффекта по каждому листу задач
    let newEffect = Object.fromEntries(tasksData.columnOrder.map(item => [item, 0]))
    tasksData.columnOrder.map(column => {
      const orderTasks = tasksData.columns[column].taskIds
      orderTasks.map(task => {
        newEffect[column] = tasksData.tasks[task].effective_expected.value + newEffect[column]
      })
    })
    return {...tasksData, columnEffect:newEffect}
}