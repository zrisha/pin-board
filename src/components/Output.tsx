import { useState, useEffect } from 'react';
import { Card, Typography, theme, Spin, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { pinyin } from 'pinyin-pro';
import { lookupChar, useModernDict } from '../hooks/pinyin';
import styles from './Output.module.css';

const { Text } = Typography;

type TabState = { text: string; loading: boolean };
type TabKey = 'pinyin' | 'hanyu' | 'definition';

const tabList = [
  { key: 'pinyin', label: 'Pinyin' },
  { key: 'hanyu', label: 'Hanyu' },
  { key: 'definition', label: 'Definition' },
];

function OutputTooltip({
  text,
  tooltip,
  key,
}: {
  text: string;
  tooltip: string | undefined;
  key: React.Key;
}) {
  return tooltip ? (
    <Tooltip key={key} title={tooltip} trigger={['hover', 'click']}>
      <span className={styles.lookupText}>{text}</span>
    </Tooltip>
  ) : (
    <span key={key}>{text}</span>
  );
}

function PinyinTab({
  editorValue,
  onStateChange,
}: {
  editorValue: string;
  onStateChange: (state: TabState) => void;
}) {
  const pinyinReady = useModernDict();
  const chars = editorValue ? Array.from(editorValue) : [];
  const pinyinArray = pinyinReady ? pinyin(editorValue, { type: 'array' }) : [];
  const pinyinText = pinyinArray.join(' ');

  useEffect(() => {
    onStateChange({ text: pinyinText, loading: !pinyinReady });
  }, [pinyinText, pinyinReady, onStateChange]);

  return (
    <>
      {chars.map((char, index) => (
        <OutputTooltip key={index} text={pinyinArray[index]} tooltip={char} />
      ))}
    </>
  );
}

function HanyuTab({
  editorValue,
  onStateChange,
}: {
  editorValue: string;
  onStateChange: (state: TabState) => void;
}) {
  useEffect(() => {
    onStateChange({ text: editorValue, loading: false });
  }, [editorValue, onStateChange]);

  return (
    <>
      {Array.from(editorValue).map((char, i) => {
        const def = lookupChar(char)?.slice(0, 3).join(' | ');
        return <OutputTooltip key={i} text={char} tooltip={def} />;
      })}
    </>
  );
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
            {activeTab === 'hanyu' && (
              <HanyuTab editorValue={editorValue} onStateChange={setTabState} />
            )}
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
