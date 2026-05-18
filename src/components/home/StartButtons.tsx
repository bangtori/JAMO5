import { useState } from 'react';
import Button from '../ui/Button';
import { Link, Gamepad2, CheckCheck } from 'lucide-react';
import { useToastContext } from '../../context/ToastContext';
import { TOAST_DURATION } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../../services/linkService';
import { getRandomWord } from '../../services/wordService';

export default function StartButtons() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastContext();

  const navigate = useNavigate();
  async function handleCopyLink() {
    try {
      const word = getRandomWord();
      const token = generateToken(word);
      const url = `${window.location.origin}/waiting?token=${token}`;

      await navigator.clipboard.writeText(url);
      showToast('링크가 클립보드에 복사되었습니다.');
      setCopied(true);
      setTimeout(() => setCopied(false), TOAST_DURATION);
    } catch {
      showToast('링크 복사에 실패했어요.', 'danger');
    }
  }
  return (
    <section className="flex flex-col gap-3 justify-center">
      <Button
        size="lg"
        icon={<Gamepad2 />}
        onClick={() => navigate('/waiting')}
      >
        혼자 시작하기
      </Button>
      <Button
        size="lg"
        variant="neutral"
        icon={copied ? <CheckCheck className="text-correct" /> : <Link />}
        onClick={handleCopyLink}
      >
        {copied ? '링크가 생성되었습니다' : '링크 생성하기'}
      </Button>
    </section>
  );
}
