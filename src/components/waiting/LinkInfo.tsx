import type { TryInfo } from '../../types';
import Card from '../ui/Card';
import Divider from '../ui/Divider';
interface LinkInfoProps {
  tryInfo: TryInfo;
  expiresAt: string;
  isExpired: boolean;
}
export default function LinkInfo({
  tryInfo,
  expiresAt,
  isExpired,
}: LinkInfoProps) {
  return (
    <Card>
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex w-full justify-between items-center">
          <p className="text-text-muted">도전 현황</p>
          {tryInfo.isPlayed ? (
            tryInfo.result === 'won' ? (
              <span className="text-correct font-bold">
                성공({tryInfo.attempts}번 시도)
              </span>
            ) : (
              <span className="text-danger font-bold">실패</span>
            )
          ) : (
            <span className="text-text-muted font-bold">미도전</span>
          )}
        </div>
        <Divider />
        <div className="flex w-full justify-between items-center">
          <p className="text-text-muted">링크 만료</p>
          {isExpired ? (
            <p className="text-danger font-bold">만료됨</p>
          ) : (
            <p className="text-present font-bold">{expiresAt} 후 만료</p>
          )}
        </div>
      </div>
    </Card>
  );
}
