import { useEffect, useState } from 'react';
import PageLayout from '../components/ui/PageLayout';
import LinkInfo from '../components/waiting/LinkInfo';
import WaitingHeader from '../components/waiting/WaitingHeader';
import type { TryInfo } from '../types';
import { getRemainingTime } from '../utils/date';
import Button from '../components/ui/Button';
import { ChevronRight, CircleQuestionMark } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HowToPlayModal from '../components/ui/HowToPlayModal';
import { decodeToken } from '../services/linkService';
import { useToastContext } from '../context/ToastContext';
import { getTryInfo } from '../services/gameStorageService';

export default function WaitingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToastContext();
  const token = searchParams.get('token');
  const isLinkMode = !!token;
  const tokenData = token ? decodeToken(token) : null;
  const expiresAt = tokenData?.expiresAt || 0;

  // 게임 방법 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 게임 시도 정보
  const [tryInfo] = useState<TryInfo>(() => {
    if (!token) return { isPlayed: false };
    return getTryInfo(token) ?? { isPlayed: false };
  });

  const [remainingTime, setRemainingTime] = useState(
    isLinkMode ? getRemainingTime(expiresAt) : '',
  );
  const [isExpired, setIsExpired] = useState(
    isLinkMode ? expiresAt < Date.now() : false,
  );

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

  useEffect(() => {
    if (token && !tokenData) {
      showToast('만료되었거나 유효하지 않은 링크예요.', 'danger');
      navigate('/');
    }
  }, [token, tokenData, showToast, navigate]);

  if (token && !tokenData) {
    return null;
  }

  // 게임 시작 버튼 클릭 핸들러
  function handleGameStart() {
    if (isLinkMode) {
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
          <Button
            variant="neutral"
            appearance="outline"
            size="lg"
            onClick={() => navigate('/')}
          >
            홈으로 돌아가기
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
