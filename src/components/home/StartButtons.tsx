import { useState } from 'react';
import Button from '../ui/Button';
import { Link, Gamepad2, CheckCheck } from 'lucide-react';
import { useToastContext } from '../../context/ToastContext';
import { TOAST_DURATION } from '../../constants';

export default function StartButtons() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastContext();
  function handleCopyLink() {
    showToast('링크가 클립보드에 복사되었습니다.');
    setCopied(true);
    // TODO: - 실제 클립보드에 복사하는 코드 추가
    setTimeout(() => {
      setCopied(false);
    }, TOAST_DURATION);
  }
  return (
    <section className="flex flex-col gap-3 justify-center">
      <Button size="lg" icon={<Gamepad2 />}>
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
