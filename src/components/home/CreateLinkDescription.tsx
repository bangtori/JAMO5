import Card from '../ui/Card';
import { Check } from 'lucide-react';
export default function CreateLinkDescription() {
  return (
    <Card className="flex flex-col gap-2">
      <h3 className="text-text font-bold">친구와 같이 도전</h3>
      <div className="flex flex-col gap-1">
        <p className="text-text-muted text-xs">
          링크를 생성하면 랜덤 제시어가 담긴 초대 링크가 만들어져요.
        </p>
        <p className="text-text-muted text-xs">
          친구에게 공유하면 같은 제시어로 각자 도전할 수 있어요.
        </p>
      </div>

      <div className="flex gap-3 text-2xs text-text-muted">
        <span className="flex gap-1 items-center">
          <Check size={10} className="text-correct" />
          제시어는 서로 모르는 상태로 시작
        </span>
        <span>·</span>
        <span className="flex gap-1 items-center">
          <Check size={10} className="text-correct" />
          유효시간 내 입장 가능
        </span>
      </div>
    </Card>
  );
}
