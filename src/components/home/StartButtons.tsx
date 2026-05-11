import { useState } from 'react';
import Button from '../ui/Button';
import { Link, Gamepad2, CheckCheck } from 'lucide-react';
import { useToastContext } from '../../context/ToastContext';
export default function StartButtons() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastContext();
  function handleCopyLink() {
    showToast('링크가 클립보드에 복사되었습니다.');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
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
