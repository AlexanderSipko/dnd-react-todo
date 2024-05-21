import { useState } from 'react'
import initialData from './initial-data'
import Tasks1 from './components/Tasks-1'
import '@atlaskit/css-reset'

function App() {

  return (
    <>
      <h2>DND-react-app V</h2>
      <Tasks1 tasksArray={initialData}/>
    </>
  )
}

export default App
