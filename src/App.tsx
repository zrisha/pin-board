import { Layout, Flex, Spin } from 'antd';
import { Editor } from './components/Editor';
import { useRime, type UseRime } from 'react-rime';
import { PreEdit } from './components/PreEdit';
import { CandidatesGrid } from './components/CandidatesGrid';
import { HeaderMenu } from './components/HeaderMenu';
import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

export function App() {
  const rime: UseRime = useRime({
    schema: 'luna_pinyin',
    pageSize: 4,
    userDict: false,
  });
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.appHeader}>
        <div className={styles.appHeaderContent}>
          <Flex align="center" gap="large" justify="space-between">
            <h2 className={styles.title}>Pin-Board</h2>
            <HeaderMenu rime={rime} />
          </Flex>
        </div>
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
      <Footer></Footer>
    </Layout>
  );
}
