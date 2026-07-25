import { type UseRime } from 'react-rime';
import { Alert } from 'antd';
import styles from './PreEdit.module.css';

type PreEditProps = {
  rime: UseRime;
};

export function PreEdit({ rime }: PreEditProps) {
  const component = (
    <>
      {rime.composing && (
        <div className={styles.preedit} data-testid="preedit">
          {rime.preedit.head}
          <span className={styles.cursor}>{rime.preedit.body}</span>
          {rime.preedit.tail}
        </div>
      )}
    </>
  );
  return (
    <Alert
      style={{ width: '100%' }}
      description={component}
      type="info"
    ></Alert>
  );
}
