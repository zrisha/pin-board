import { Layout, Flex, Spin } from 'antd';
import { Editor } from './components/Editor';
import { useRime, type UseRime } from 'react-rime';
import { PreEdit } from './components/PreEdit';
import { CandidatesGrid } from './components/CandidatesGrid';
import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

export function App() {
  const rime: UseRime = useRime({ pageSize: 4, userDict: false });
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Pin-Board</h1>
      </Header>
      <Content>
        <Spin spinning={rime.loading}>
          <Flex
            vertical
            align="center"
            justify="center"
            gap="medium"
            className={styles.appContent}
          >
            <PreEdit rime={rime} />
            <CandidatesGrid rime={rime} />

            <Editor rime={rime} />
          </Flex>
        </Spin>
      </Content>
      <Footer>Foots</Footer>
    </Layout>
  );
}
