import { type UseRime } from 'react-rime';
import { Alert, theme } from 'antd';
import styles from './PreEdit.module.css';

type PreEditProps = {
  rime: UseRime;
};

export function PreEdit({ rime }: PreEditProps) {
  const { token } = theme.useToken();
  const preedit: UseRime['preedit'] = rime.composing
    ? rime.preedit
    : { head: ' ', tail: '', body: '' };
  const component = (
    <>
      <div
        className={styles.preedit}
        style={{ height: token.fontSize * token.lineHeight * 2 }}
        data-testid="preedit"
      >
        {preedit.head}
        <span className={styles.cursor}>{preedit.body}</span>
        {preedit.tail}
      </div>
    </>
  );
  return (
    <Alert
      className={styles.preeditBox}
      style={{ width: '100%' }}
      description={component}
      type="info"
    ></Alert>
  );
}
