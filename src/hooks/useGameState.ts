import { useEffect, useMemo, useState } from 'react';
import wordList from '../data/wordList.json';
import {
  type GameResult,
  type RowResult,
  type Word,
  type BoardResult,
  type TileState,
} from '../types';
import { useToastContext } from '../context/ToastContext';
import { calculateRowResult } from '../services/gameService';
import { isGameWon } from '../utils/game';

export default function useGameState() {
  const { showToast } = useToastContext();

  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [prevRows, setPrevRows] = useState<RowResult[]>([]);
  const [result, setResult] = useState<GameResult>({
    gameStatus: 'playing',
    board: [],
  });

  const [playTime, setPlayTime] = useState<number>(0);

  useEffect(() => {
    if (result.gameStatus !== 'playing') return;
    const timer = setInterval(() => {
      setPlayTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [result.gameStatus]);

  const answer = useMemo(() => {
    const words = wordList as Word[];
    return words[Math.floor(Math.random() * words.length)];
  }, []);

  const keyboardState = useMemo(() => {
    const result: Record<string, TileState | undefined> = {};
    for (const row of prevRows) {
      for (const tile of row) {
        const existing = result[tile.letter];
        // 이미 correct가 저장되었다면 넘어감
        if (existing === 'correct') continue;

        // correct > present > absent 순서로 저장
        // tile의 상태가 correct 라면 무조건 correct 저장
        // 그 다음 present 라면 present 저장 (기존 correct인건 이미 거름)
        // 기존 값이 존재하지 않고 tile 이 correct와 present가 아닌 경우 absent 저장
        if (tile.state === 'correct') result[tile.letter] = 'correct';
        else if (tile.state === 'present') result[tile.letter] = 'present';
        else if (!existing) result[tile.letter] = 'absent';
      }
    }
    return result;
  }, [prevRows]);

  // 키보드 입력이 들어왔을 때
  function inputLetter(letter: string) {
    if (currentInput.length == 5) {
      showToast('이미 5글자 입력했습니다.');
      return;
    }
    setCurrentInput((prev) => [...prev, letter]);
  }

  // 백스페이스 입력이 들어왔을 때
  function deleteLetter() {
    if (currentInput.length == 0) {
      return;
    }
    setCurrentInput((prev) => prev.slice(0, -1));
  }

  // 단어 제출이 들어왔을 때
  function submitWord() {
    if (currentInput.length !== 5) {
      showToast('5글자를 입력해주세요.', 'warning');
      return;
    }
    const answerLetters = answer.letters;
    const rowResult = calculateRowResult(answerLetters, currentInput);

    const newRows = [...prevRows, rowResult] as BoardResult;
    setPrevRows(newRows);
    setCurrentInput([]);

    // 게임을 끝냈는지 확인
    if (isGameWon(rowResult)) {
      setResult({
        gameStatus: 'won',
        board: newRows,
      });
      return;
    }

    // 성공하지 못하고 마지막 시도인 경우
    if (newRows.length === 5) {
      setResult({
        gameStatus: 'lost',
        board: newRows,
      });
      return;
    }
  }

  return {
    currentInput,
    prevRows,
    result,
    answer,
    inputLetter,
    deleteLetter,
    submitWord,
    keyboardState,
    playTime,
  };
}
