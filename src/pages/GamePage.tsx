import GameBoard from '../components/game/GameBoard';
import GameHeader from '../components/game/GameHeader';
import Keyboard from '../components/game/Keyboard';
import HowToPlayModal from '../components/ui/HowToPlayModal';
import PageLayout from '../components/ui/PageLayout';
import { useEffect, useState } from 'react';
import useGameState from '../hooks/useGameState';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPlayTime } from '../utils/date';
import { decodeToken } from '../services/linkService';
import type { Word } from '../types';
import { useToastContext } from '../context/ToastContext';
import {
  getTryInfo,
  saveGameEntry,
  saveGameResult,
} from '../services/gameStorageService';

export default function GamePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const tokenData = token ? decodeToken(token) : null;
  const initialWord: Word | undefined = tokenData?.word;

  const {
    currentInput,
    prevRows,
    result,
    inputLetter,
    deleteLetter,
    submitWord,
    keyboardState,
    answer,
    playTime,
  } = useGameState(initialWord);

  const { showToast } = useToastContext();

  const [alreadyPlayed] = useState(() => {
    if (!token) return false;
    const tryInfo = getTryInfo(token);
    return tryInfo !== null; // 이미 저장된 게 있으면 true
  });

  useEffect(() => {
    if (!token) return;
    // 이미 시도한 적이 있다면 대기 페이지로 리다이렉트
    if (alreadyPlayed) {
      showToast('이미 플레이한 적이 있어요.', 'warning');
      navigate(`/waiting?token=${token}`);
      return;
    }

    // 아니라면 새 게임 여부 저장하고 시작
    saveGameEntry(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate, alreadyPlayed]);

  useEffect(() => {
    if (result.gameStatus !== 'playing') {
      if (token) {
        // 링크 모드라면 결과 저장
        saveGameResult(token, {
          isPlayed: true,
          result: result.gameStatus === 'won' ? 'won' : 'lost',
          ...(result.gameStatus === 'won' && { attempts: prevRows.length }),
        });
      }
      navigate('/result', { state: { result, answer, playTime } });
    }
  }, [navigate, result, answer, playTime, prevRows.length, token]);

  useEffect(() => {
    if (token && !tokenData) {
      showToast('유효하지 않은 링크예요.', 'danger');
      navigate('/');
    }
  }, [token, tokenData, showToast, navigate]);

  if (token && !tokenData) return null;

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  return (
    <PageLayout className="gap-10">
      <GameHeader
        tryCount={prevRows.length + 1}
        onOpenHowToPlayModal={handleOpenModal}
        playTime={getPlayTime(playTime)}
      />
      <section className="flex justify-center">
        <GameBoard prevRows={prevRows} currentRow={currentInput} />
      </section>
      <Keyboard
        keyboardState={keyboardState}
        onSubmit={submitWord}
        onDelete={deleteLetter}
        onInput={inputLetter}
      />
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
}
