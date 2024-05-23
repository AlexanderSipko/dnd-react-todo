import { useState } from 'react'
import initialData from './components/initial-data'
import App from './components/Tasks-1'
import styled from 'styled-components';
import '@atlaskit/css-reset'

const Container = styled.div`
  display: flex;
`;

function App_1() {

  return (
    <>
      <p style={{'fontSize':'10px'}}>{import.meta.env.VITE_API_KEY}</p>
      <h4>{import.meta.env.VITE_NAME}</h4>
      <Container>
        <App tasksArray={initialData}/>
      </Container>
    </>
  )
}

export default App_1
