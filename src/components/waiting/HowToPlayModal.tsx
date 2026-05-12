import Button from '../ui/Button';
import { X } from 'lucide-react';
import Divider from '../ui/Divider';
import Tile from '../ui/Tile';
import Card from '../ui/Card';
interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  if (!isOpen) return null;
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
    >
      {/* 모달 본체 */}
      <div className="bg-surface rounded-xl mx-4 pt-4 pb-8 border border-border max-w-md flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header - title, x 버튼 */}
        <div className="flex justify-between items-center px-6">
          <h2 className="font-bold font-title text-2xl">게임 방법</h2>
          <Button
            variant="neutral"
            appearance="ghost"
            size="sm"
            icon={<X />}
            onClick={onClose}
          />
        </div>
        <Divider className="my-4" />
        {/* 게임 방법 설명 영역 */}
        <div className="flex flex-col gap-4 px-6">
          <p className="text-sm text-text-muted">
            자모 5개로 이루어진 단어를 5번 안에 맞추는 게임이에요. 자모 한
            글자씩 입력할 수 있어요.
          </p>
          {/* 판정 기준 영역 */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-muted">판정 기준</p>
            {/* 초록 - 정답 */}
            <div className="flex gap-2 items-center">
              <Tile state="correct" letter="ㄱ" />
              <div className="flex flex-col gap-1">
                <p className="font-bold">초록 - 정답</p>
                <p className="text-sm text-text-muted">
                  해당 자모가 정답에 포함되어 있고, 위치도 정확해요.
                </p>
              </div>
            </div>
            {/* 노랑 - 포함 */}
            <div className="flex gap-2 items-center">
              <Tile state="present" letter="ㄴ" />
              <div className="flex flex-col gap-1">
                <p className="font-bold">노랑 - 포함</p>
                <p className="text-sm text-text-muted">
                  해당 자모가 정답에 포함되어 있지만, 위치는 달라요.
                </p>
              </div>
            </div>
            {/* 회색 - 없음 */}
            <div className="flex gap-2 items-center">
              <Tile state="absent" letter="ㄷ" />
              <div className="flex flex-col gap-1">
                <p className="font-bold">회색 - 없음</p>
                <p className="text-sm text-text-muted">정답에 없는 자모예요</p>
              </div>
            </div>
          </div>
          {/* 예시 입력 */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-muted">예시 입력</p>
            <Card className="bg-bg">
              <div className="flex flex-col gap-2 text-text-muted text-sm">
                <p>정답이 "가난" 일때</p>
                <div className="flex gap-1">
                  <Tile state="correct" letter="ㄱ" />
                  <Tile state="absent" letter="ㅗ" />
                  <Tile state="present" letter="ㄴ" />
                  <Tile state="absent" letter="ㅐ" />
                  <Tile state="absent" letter="ㅇ" />
                </div>
                <p>
                  "고냉" 입력 시 - ㄱ은 위치 일치(초록), ㄴ은 있지만 위치
                  다름(노랑), 나머지 없음 (회색)
                </p>
              </div>
            </Card>
          </div>
          {/* 세부 규칙 */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-muted">규칙</p>
            <ul className="text-sm text-text-muted list-disc pl-5 marker:text-accent">
              <li className="text-sm text-text-muted">
                자모는 초성·중성·종성 모두 개별로 취급해요
              </li>
              <li className="text-sm text-text-muted">
                복합 모음(ㅘ, ㅚ 등)은 사용하지 않아요
              </li>
              <li className="text-sm text-text-muted">
                자모 합계가 5개인 단어만 제출할 수 있어요
              </li>
              <li className="text-sm text-text-muted">
                시작하기를 누르면 타이머가 시작돼요
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
