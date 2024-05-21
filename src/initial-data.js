const initialData = {
    tasks: {
      'Задача-1': { id: 'Задача-1', content: 'Создать перетаскиваемый колонки' },
      'Задача-2': { id: 'Задача-2', content: 'Добавить стили' },
      'Задача-3': { id: 'Задача-3', content: 'Добавить АПИ' },
      'Задача-4': { id: 'Задача-4', content: 'Добавить форму добавления задач' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'В работе',
        taskIds: ['Задача-1', 'Задача-2', 'Задача-3', 'Задача-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
  
export default initialData;
  