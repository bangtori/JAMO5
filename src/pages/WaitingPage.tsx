import { useEffect, useState } from 'react';
import PageLayout from '../components/ui/PageLayout';
import LinkInfo from '../components/waiting/LinkInfo';
import WaitingHeader from '../components/waiting/WaitingHeader';
import type { TryInfo } from '../types';
import { getRemainingTime } from '../utils/date';
import Button from '../components/ui/Button';
import { ChevronRight, CircleQuestionMark } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HowToPlayModal from '../components/waiting/HowToPlayModal';

const DummyTryInfos: TryInfo[] = [
  { isPlayed: false }, // 미도전
  { isPlayed: true, result: 'won', attempts: 2 }, // 성공,
  { isPlayed: true, result: 'lost' }, // 실패, 5번안에 못 맞힘
];
// 임의의 만료 시간 데이터
const expiresAt = Date.now() + 20 * 60 * 60 * 1000;
export default function WaitingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isLinkMode = !!token;

  // 게임 방법 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 더미 데이터 랜덤 로드 용
  const [tryInfo] = useState(
    () => DummyTryInfos[Math.floor(Math.random() * DummyTryInfos.length)],
  );

  const [remainingTime, setRemainingTime] = useState(
    isLinkMode ? getRemainingTime(expiresAt) : '',
  );
  const [isExpired, setIsExpired] = useState(expiresAt < Date.now());

  useEffect(() => {
    if (!isLinkMode) return;
    const timer = setInterval(() => {
      const expired = expiresAt < Date.now();
      setRemainingTime(getRemainingTime(expiresAt));
      setIsExpired(expired);
      if (expired) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [isLinkMode, expiresAt]);

  // 게임 시작 버튼 클릭 핸들러
  function handleGameStart() {
    if (isLinkMode) {
      // TODO: - 게임 실행 체크 로컬 스토리지 저장 로직 추가
      navigate(`/game?token=${token}`);
    } else {
      navigate('/game');
    }
  }

  const isGameOver = isLinkMode && (tryInfo.isPlayed || isExpired);

  return (
    <PageLayout className="gap-10">
      <WaitingHeader isLinkMode={isLinkMode} />
      {isLinkMode && (
        <LinkInfo
          tryInfo={tryInfo}
          expiresAt={remainingTime}
          isExpired={isExpired}
        />
      )}
      <section className="flex flex-col gap-3 w-full">
        <Button
          variant="neutral"
          appearance="outline"
          size="lg"
          icon={<CircleQuestionMark />}
          iconPosition="right"
          onClick={() => setIsModalOpen(true)}
        >
          게임 방법
        </Button>
        {isGameOver ? (
          <Button variant="primary" appearance="filled" size="lg" disabled>
            게임 종료
          </Button>
        ) : (
          <Button
            variant="primary"
            appearance="filled"
            size="lg"
            icon={<ChevronRight />}
            iconPosition="right"
            onClick={handleGameStart}
          >
            게임 시작
          </Button>
        )}
      </section>
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
}
