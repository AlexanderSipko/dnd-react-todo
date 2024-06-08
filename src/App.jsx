import LeftMenu from './layout/LeftMenu';
import Board from './layout/Board'
import styled from 'styled-components';
import '@atlaskit/css-reset'

const Container = styled.div`
  display: flex;
`;

function App_1() {

  return (
      <Container>
        <LeftMenu/>
          <Board/>
          <a href="https://www.avito.ru/kyrykkale/mototsikly_i_mototehnika/voge_rally_300_3702068424"
          >test</a>
      </Container>
  )
}

export default App_1
