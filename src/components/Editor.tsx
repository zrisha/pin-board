import React from 'react';
import { Input, theme } from 'antd';
import { type UseRime } from 'react-rime';
import { Output } from './Output';
import styles from './Editor.module.css';

const { TextArea } = Input;

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

  return (
    <>
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
      <Output editorValue={value} />
    </>
  );
}
