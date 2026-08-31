import { useState, useEffect } from 'react';
import { Card, Typography, theme, Spin, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { pinyin, segment } from 'pinyin-pro';
import {
  lookupChar,
  useCompleteDict,
  useWordDict,
  lookupWord,
} from '../hooks/pinyin';
import styles from './Output.module.css';

const { Text } = Typography;

type TabState = { text: string; loading: boolean };
type TabKey = 'pinyin' | 'word' | 'char';

const tabList = [
  { key: 'pinyin', label: 'Pinyin' },
  { key: 'word', label: 'Word' },
  { key: 'char', label: 'Char' },
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
  useCompleteDict();
  const chars = editorValue ? Array.from(editorValue) : [];
  const pinyinArray = pinyin(editorValue, { type: 'array' });
  const pinyinText = pinyinArray.join(' ');

  useEffect(() => {
    onStateChange({ text: pinyinText, loading: false });
  }, [pinyinText, onStateChange]);

  return (
    <>
      {chars.map((char, index) => (
        <OutputTooltip
          key={index}
          text={pinyinArray[index]}
          tooltip={pinyinArray[index] !== char ? char : undefined}
        />
      ))}
    </>
  );
}

function CharTab({
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

function WordTab({
  editorValue,
  onStateChange,
}: {
  editorValue: string;
  onStateChange: (state: TabState) => void;
}) {
  const wordDict = useWordDict();
  const segmentReady = useCompleteDict();

  useEffect(() => {
    onStateChange({ text: editorValue, loading: !wordDict || !segmentReady });
  }, [editorValue, wordDict, segmentReady, onStateChange]);

  const segmented = editorValue ? segment(editorValue) : [];
  return (
    <>
      {segmented.map((word, i) => (
        <OutputTooltip
          key={i}
          text={word.origin}
          tooltip={lookupWord(word.origin, wordDict)?.slice(0, 2).join(' | ')}
        />
      ))}
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
            {activeTab === 'word' && (
              <WordTab editorValue={editorValue} onStateChange={setTabState} />
            )}
            {activeTab === 'char' && (
              <CharTab editorValue={editorValue} onStateChange={setTabState} />
            )}
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
