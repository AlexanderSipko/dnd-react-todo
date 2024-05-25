import LeftMenu from './layout/LeftMenu';
import Board from './layout/Board'
import styled from 'styled-components';
import '@atlaskit/css-reset'
import initialData from './assets/initial-data'

const Container = styled.div`
  display: flex;
`;

function App_1() {

  return (
      <Container>
        <LeftMenu/>
          <Board tasksArray={initialData}/>
      </Container>
  )
}

export default App_1
