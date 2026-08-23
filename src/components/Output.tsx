import { useState, useEffect } from 'react';
import { Card, Typography, theme, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { pinyin } from 'pinyin-pro';
import { useModernDict } from '../hooks/pinyin';
import styles from './Output.module.css';

const { Text } = Typography;

type TabState = { text: string; loading: boolean };
type TabKey = 'pinyin' | 'hanyu' | 'definition';

const tabList = [
  { key: 'pinyin', label: 'Pinyin' },
  { key: 'hanyu', label: 'Hanyu' },
  { key: 'definition', label: 'Definition' },
];

function PinyinTab({
  editorValue,
  onStateChange,
}: {
  editorValue: string;
  onStateChange: (state: TabState) => void;
}) {
  const pinyinReady = useModernDict();
  const pinyinText = pinyinReady ? pinyin(editorValue) : '';

  useEffect(() => {
    onStateChange({ text: pinyinText, loading: !pinyinReady });
  }, [pinyinText, pinyinReady, onStateChange]);

  return <>{pinyinText}</>;
}

export function Output({ editorValue }: { editorValue: string }) {
  const { token } = theme.useToken();
  const [activeTab, setActiveTab] = useState<TabKey>('pinyin');
  const [tabState, setTabState] = useState<TabState>({
    text: '',
    loading: false,
  });

  return (
    <div className={styles.outputWrapper}>
      <Spin spinning={tabState.loading}>
        <Card
          styles={{
            body: { padding: token.paddingSM, height: 120, overflowY: 'auto' },
          }}
          tabList={tabList}
          tabProps={{ size: 'medium' }}
          activeTabKey={activeTab}
          onTabChange={(key) => {
            setActiveTab(key as TabKey);
            setTabState({ text: '', loading: false }); // reset between tabs
          }}
        >
          <Text className={styles.textOutputText}>
            {activeTab === 'pinyin' && (
              <PinyinTab
                editorValue={editorValue}
                onStateChange={setTabState}
              />
            )}
            {activeTab === 'hanyu' && <span>hanyu</span>}
            {activeTab === 'definition' && <span>definition</span>}
          </Text>
        </Card>
      </Spin>
      <Text
        className={styles.textCopyButton}
        copyable={{
          text: tabState.text,
          icon: <CopyOutlined style={{ fontSize: 18 }} />,
        }}
      />
    </div>
  );
}
