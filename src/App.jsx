import { useState } from 'react'
import initialData from './initial-data'
import Tasks1 from './components/Tasks-1'
import '@atlaskit/css-reset'

function App() {

  return (
    <>
      <p>{import.meta.env.VITE_API_KEY}</p>
      <h2>{import.meta.env.VITE_NAME}</h2>
      <Tasks1 tasksArray={initialData}/>
    </>
  )
}

export default App
