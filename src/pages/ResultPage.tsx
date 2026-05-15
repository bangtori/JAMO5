import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/ui/PageLayout';
import type { GameResult, Word } from '../types';
import ResultHeader from '../components/result/ResultHeader';
import AnswerSection from '../components/result/AnswerSection';
import ProgressRecord from '../components/result/ProgressRecord';
import ButtonSection from '../components/result/ButtonSection';
import { copyResultToClipboard } from '../utils/game';
import { useToastContext } from '../context/ToastContext';
import CopyPreview from '../components/result/CopyPreview';
import { getPlayTime } from '../utils/date';

interface ResultState {
  result: GameResult;
  answer: Word;
  playTime: number;
}

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  // 바로 결과페이지로 들어올 시 홈으로 리다이렉트
  if (!state) {
    navigate('/');
    return null;
  }
  const { result, answer, playTime: time } = state as ResultState;
  const playTime = getPlayTime(time);
  const copyText = copyResultToClipboard(result, playTime);

  function handlePlayAgain() {
    navigate('/');
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      showToast('결과가 클립보드에 복사되었습니다. 친구에게 공유해보세요!');
    } catch {
      showToast('복사에 실패했어요.', 'danger');
    }
  }

  return (
    <PageLayout>
      <ResultHeader
        tryCount={result.board.length}
        result={result.gameStatus}
        playTime={playTime}
      />
      <AnswerSection answer={answer} />
      <ProgressRecord board={result.board} />
      <ButtonSection onCopy={handleCopy} onPlayAgain={handlePlayAgain} />
      <CopyPreview copyText={copyText} />
    </PageLayout>
  );
}
