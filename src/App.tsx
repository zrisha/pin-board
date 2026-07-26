import { Layout, Flex } from 'antd';
import { AntEditor } from './components/AntEditor';
import { useRime, type UseRime } from 'react-rime';
import { PreEdit } from './components/PreEdit';
import { Candidates } from './components/Candidates';
import { CandidatesGrid } from './components/CandidatesGrid';

const { Header, Content, Footer } = Layout;

export function App() {
  const rime: UseRime = useRime({ pageSize: 4, userDict: false });
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Pin-Board</h1>
      </Header>
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          gap="medium"
          style={{ padding: '2% 20%' }}
        >
          <PreEdit rime={rime} />
          <CandidatesGrid rime={rime} />
          <AntEditor rime={rime} />
        </Flex>
      </Content>
      <Footer>Foots</Footer>
    </Layout>
  );
}
