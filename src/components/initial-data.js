const initialData = {
    tasks: {
      't-1': { id: 't-1', content: 'режим админа' },
      't-2': { id: 't-2', content: 'стили' },
      't-3': { id: 't-3', content: 'абстракцию для логики' },
      't-4': { id: 't-4', content: 'форма для новой задачи' },
      't-5': { id: 't-5', content: 'перевод в скрытые статусы (архив)' },
      't-6': { id: 't-6', content: 'блок карточки' },
      't-7': { id: 't-7', content: 'содержание карточки и форма входного массива' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: '#1 Бэклог',
        taskIds: ['t-1', 't-3', 't-4'],
      },
      'column-2': {
        id: 'column-2',
        title: '#2 В работе',
        taskIds: ['t-5', 't-6', 't-7'],
      },
      'column-3': {
        id: 'column-3',
        title: '#3 Выполнено',
        taskIds: ['t-2'],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
  
export default initialData;
  