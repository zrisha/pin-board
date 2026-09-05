import { useMemo } from 'react';
import { type RimeCandidate, type UseRime } from 'react-rime';
import { Button, Card, Col, Typography, Row, Space, theme, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { pinyin } from 'pinyin-pro';
import { useCompleteDict } from '../hooks/pinyin';
import styles from './CandidatesGrid.module.css';

const { Text } = Typography;

type CandidatesGridProps = {
  rime: UseRime;
};

type CandidateProps = {
  candidate: RimeCandidate;
  index: number;
  onClick: () => void;
  pinyinReady: boolean;
};

const Candidate = ({
  candidate,
  index,
  onClick,
  pinyinReady,
}: CandidateProps) => {
  const { token } = theme.useToken();
  const pinyinText = useMemo(() => pinyin(candidate.text), [candidate.text]);
  return (
    <Col xs={12}>
      <Card
        size="small"
        hoverable
        className={styles.fullHeight}
        onClick={onClick}
      >
        <Space vertical size={3} className={styles.fullWidth}>
          <div className={styles.candidateWrapper}>
            <Text className={styles.candidateText}>{candidate.text}</Text>
            <Text type="secondary" className={styles.noShrink}>
              {index + 1}
            </Text>
          </div>
          {/* Reserve two lines so card heights stay stable as candidates
              change per keystroke. */}
          <div style={{ minHeight: token.fontSize * token.lineHeight * 2 }}>
            {pinyinReady ? (
              <Text type="secondary">{pinyinText}</Text>
            ) : (
              <Spin size="small" />
            )}
          </div>
        </Space>
      </Card>
    </Col>
  );
};

export function CandidatesGrid({ rime }: CandidatesGridProps) {
  const pinyinReady = useCompleteDict();
  return (
    // Fixed-height region so the editor below never moves; an oversized
    // candidate page scrolls here instead of pushing the layout.
    <div className={styles.candidatesGrid}>
      {rime.composing && (
        <>
          <div className={styles.paginationArrow}>
            <Button
              {...rime.getPagingProps(true)}
              disabled={rime.page == 0}
              shape="circle"
              size="small"
              icon={<LeftOutlined />}
            />
          </div>
          <Row
            className={styles.candidatesRow}
            gutter={[
              { xs: 8, sm: 16, md: 20 },
              { xs: 8, sm: 16, md: 20 },
            ]}
          >
            {rime.candidates.map((candidate, index) => (
              <Candidate
                key={index}
                candidate={candidate}
                index={index}
                {...rime.getCandidateProps(index)}
                pinyinReady={pinyinReady}
              />
            ))}
          </Row>
          <div className={styles.paginationArrow}>
            <Button
              {...rime.getPagingProps(false)}
              disabled={rime.isLastPage}
              shape="circle"
              size="small"
              icon={<RightOutlined />}
            />
          </div>
        </>
      )}
    </div>
  );
}
