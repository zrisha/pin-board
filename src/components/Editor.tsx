import { Input, message, theme } from 'antd';
import { type UseRime } from 'react-rime';

import styles from './Editor.module.css';

const { TextArea } = Input;

/** Matches characters outside Latin, shared punctuation/digits, and combining marks. */
const NON_LATIN = /[^\p{Script=Latin}\p{Script=Common}\p{Script=Inherited}]/u;

type EditorProps = {
  rime: UseRime;
};

export function Editor({ rime }: EditorProps) {
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const { ref: rimeRef, value, ...rimeInputProps } = rime.getInputProps();

  return (
    <>
      {contextHolder}
      <TextArea
        ref={(node) => rimeRef(node?.resizableTextArea?.textArea ?? null)}
        value={value}
        {...rimeInputProps}
        onCompositionEnd={(e) => {
          if (NON_LATIN.test(e.data)) {
            messageApi.warning({
              key: 'ime-warning',
              content:
                'Switch to an English (Latin) keyboard. Pin-board converts your pinyin for you.',
            });
          }
        }}
        placeholder="Type pinyin, e.g. nihao"
        classNames={{ textarea: styles.editorTextArea }}
        styles={{
          textarea: { padding: token.paddingSM },
        }}
      />
    </>
  );
}
