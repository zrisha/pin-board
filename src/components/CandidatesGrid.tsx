// TODO: ant design Grid, preferable with wrapping breakpoints
import { type RimeCandidate, type UseRime } from 'react-rime';
import { Card, Col, Typography, Row, Space, theme } from 'antd';
import { pinyin } from 'pinyin-pro';

const { Text } = Typography;

type CandidatesGridProps = {
  rime: UseRime;
};

type CandidateProps = {
  candidate: RimeCandidate;
  index: number;
  onClick: () => void;
};

const Candidate = ({ candidate, index, onClick }: CandidateProps) => {
  const { token } = theme.useToken();
  return (
    <Col xs={12}>
      <Card size="small" hoverable style={{ height: '100%' }} onClick={onClick}>
        <Space vertical size={3} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <Text style={{ flex: 1, minWidth: 0 }}>{candidate.text}</Text>
            <Text type="secondary" style={{ flexShrink: 0 }}>
              {index + 1}
            </Text>
          </div>
          {/* Reserve two lines so card heights stay stable as candidates
              change per keystroke. */}
          <div style={{ minHeight: token.fontSize * token.lineHeight * 2 }}>
            <Text type="secondary">{pinyin(candidate.text)}</Text>
          </div>
        </Space>
      </Card>
    </Col>
  );
};

export function CandidatesGrid({ rime }: CandidatesGridProps) {
  return (
    // Fixed-height region so the editor below never moves; an oversized
    // candidate page scrolls here instead of pushing the layout.
    <div
      style={{
        height: 220,
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
      }}
    >
      {rime.composing && (
        <Row
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
              onClick={() => void rime.selectCandidate(index)}
            />
          ))}
        </Row>
      )}
    </div>
  );
}
