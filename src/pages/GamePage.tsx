import GameBoard from '../components/game/GameBoard';
import GameHeader from '../components/game/GameHeader';
import Keyboard from '../components/game/Keyboard';
import HowToPlayModal from '../components/ui/HowToPlayModal';
import PageLayout from '../components/ui/PageLayout';
import { useEffect, useState } from 'react';
import useGameState from '../hooks/useGameState';
import { useNavigate } from 'react-router-dom';
import { getPlayTime } from '../utils/date';

export default function GamePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
  } = useGameState();

  useEffect(() => {
    if (result.gameStatus !== 'playing') {
      navigate('/result', { state: { result, answer, playTime } });
    }
  }, [navigate, result, answer, playTime]);

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
