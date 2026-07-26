// TODO: ant design Grid, preferable with wrapping breakpoints
import { type RimeCandidate, type UseRime } from 'react-rime';
import { Card, Col, Row, Typography, Space } from 'antd';
import { pinyin } from 'pinyin-pro';

const { Text } = Typography;

type CandidatesGridProps = {
  rime: UseRime;
};

type CandidateProps = {
  candidate: RimeCandidate;
  index: number;
};

const Candidate = ({ candidate, index }: CandidateProps) => {
  return (
    <Col xs={24} sm={12} md={6}>
      <Card size="small" hoverable>
        <Space vertical size={3} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <Text style={{ flex: 1, minWidth: 0 }}>{candidate.text}</Text>
            <Text type="secondary" style={{ flexShrink: 0 }}>
              {index + 1}
            </Text>
          </div>
          <Text type="secondary">{pinyin(candidate.text)}</Text>
        </Space>
      </Card>
    </Col>
  );
};

export function CandidatesGrid({ rime }: CandidatesGridProps) {
  const candidates = rime.composing ? rime.candidates : Array(4).fill('&nbsp;');
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          width: '100%',
          visibility: rime.composing ? 'unset' : 'hidden',
        }}
      >
        {candidates.map((candidate, index) => (
          <Candidate candidate={candidate} index={index} />
        ))}
      </Row>
    </>
  );
}

{
  /* return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
      <Col xs={24} sm={12} md={6}>
        <Card size="small" hoverable>
          <Space vertical>
            <Text>1</Text>
            <Text type="secondary">2</Text>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size="small" hoverable title="1">
          <Text>2</Text>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size="small" hoverable>
          <Space vertical size={3}>
            <Text>3</Text>
            <Text type="secondary">2</Text>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size="small" hoverable>
          <Space vertical>
            <Text>1</Text>
            <Text type="secondary">2</Text>
          </Space>
        </Card>
      </Col>
    </Row>
  ); */
}
