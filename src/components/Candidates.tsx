import { type UseRime } from 'react-rime';
import { Alert } from 'antd';
import './Candidates.module.css';

type CandidatesProps = {
  rime: UseRime;
};

export function Candidates({ rime }: CandidatesProps) {
  const component = (
    <>
      {rime.composing && rime.candidates.length > 0 && (
        <div data-rime-candidates="" data-testid="candidates">
          {rime.candidates.map((candidate, index) => {
            // Schemas mark comments that duplicate emoji suggestions with
            // hideComment: 'emoji'; skip those for candidates that are emoji.
            const showComment =
              !!candidate.comment &&
              (rime.hideComment === false ||
                (rime.hideComment === 'emoji' &&
                  !/\p{Emoji}/u.test(candidate.text)));
            return (
              <button
                key={index}
                type="button"
                data-rime-candidate=""
                data-highlighted={index === rime.highlighted || undefined}
                onClick={() => void rime.selectCandidate(index)}
              >
                <span data-rime-label="">
                  {rime.selectLabels?.[index] ?? index + 1}
                </span>
                <span data-rime-text="">{candidate.text}</span>
                {showComment && (
                  <span data-rime-comment="">{candidate.comment}</span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            data-rime-page="prev"
            disabled={rime.page === 0}
            onClick={() => void rime.changePage(true)}
          >
            ‹
          </button>
          <button
            type="button"
            data-rime-page="next"
            disabled={rime.isLastPage}
            onClick={() => void rime.changePage(false)}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
  return (
    <Alert
      style={{ width: '100%' }}
      description={component}
      type="success"
    ></Alert>
  );
}
