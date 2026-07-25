import React from 'react';
import { Flex, Input } from 'antd';
import { type UseRime } from 'react-rime';

const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  console.log('Change:', e.target.value);
};

type EditorProps = {
  rime: UseRime;
};

export function AntEditor({ rime }: EditorProps) {
  const { ref: rimeRef, ...rimeInputProps } = rime.getInputProps({ onChange });
  return (
    <TextArea
      ref={(node) => rimeRef(node?.resizableTextArea?.textArea ?? null)}
      {...rimeInputProps}
      showCount
      maxLength={100}
      placeholder="disable resize"
      style={{ height: 120, resize: 'none' }}
    />
  );
}
