import Card from '../ui/Card';

export default function CopyPreview({ copyText }: { copyText: string }) {
  return (
    <Card>
      <h3 className="text-text-muted text-xs mb-5">복사 내용 미리 보기</h3>
      <pre className="text-sm">{copyText}</pre>
    </Card>
  );
}
