import { type UseRime } from 'react-rime';
import { Alert } from 'antd';
import styles from './PreEdit.module.css';

type PreEditProps = {
  rime: UseRime;
};

export function PreEdit({ rime }: PreEditProps) {
  const preedit: UseRime['preedit'] = rime.composing
    ? rime.preedit
    : { head: ' ', tail: '', body: '' };
  const component = (
    <>
      <div className={styles.preedit} data-testid="preedit">
        {preedit.head}
        <span className={styles.cursor}>{preedit.body}</span>
        {preedit.tail}
      </div>
    </>
  );
  return (
    <Alert
      className={styles.preeditBox}
      styles={{
        root: { padding: '0px' },
      }}
      style={{ width: '100%' }}
      description={component}
      type="info"
    ></Alert>
  );
}
