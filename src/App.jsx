import { useState } from 'react'
import initialData from './initial-data'
import Tasks1 from './components/Tasks-1'
import styled from 'styled-components';
import '@atlaskit/css-reset'

const Container = styled.div`
  display: flex;
`;

function App() {

  return (
    <>
      <p>{import.meta.env.VITE_API_KEY}</p>
      <h2>{import.meta.env.VITE_NAME}</h2>
      <Container>
        <Tasks1 tasksArray={initialData}/>
      </Container>
    </>
  )
}

export default App
