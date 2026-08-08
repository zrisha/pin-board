import React from 'react';
import { Flex, Input, Card, Typography, theme } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { type UseRime } from 'react-rime';
import { pinyin } from 'pinyin-pro';
import styles from './Editor.module.css';

const { TextArea } = Input;
const { Text } = Typography;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  console.log('Change:', e.target.value);
};

type EditorProps = {
  rime: UseRime;
};

export function Editor({ rime }: EditorProps) {
  const { token } = theme.useToken();
  const {
    ref: rimeRef,
    value,
    ...rimeInputProps
  } = rime.getInputProps({ onChange });

  const pinyinText = pinyin(value);

  return (
    <Flex vertical gap={32} style={{ width: '100%' }}>
      <TextArea
        ref={(node) => rimeRef(node?.resizableTextArea?.textArea ?? null)}
        value={value}
        {...rimeInputProps}
        placeholder="disable resize"
        classNames={{ textarea: styles.editorTextArea }}
        styles={{
          textarea: { padding: token.paddingSM },
        }}
      />
      <div className={styles.pinyinWrapper}>
        <Card
          className={styles.pinyinCard}
          styles={{ body: { padding: token.paddingSM, height: '100%' } }}
        >
          <Text
            className={styles.pinyinText}
            style={{
              whiteSpace: 'pre-line',
            }}
          >
            {pinyinText}
          </Text>
        </Card>
        <Text
          className={styles.pinyinCopyButton}
          copyable={{
            text: pinyinText,
            icon: <CopyOutlined style={{ fontSize: 18 }} />,
          }}
        />
      </div>
    </Flex>
  );
}
