import CreateLinkDescription from '../components/home/CreateLinkDescription';
import HomeHeader from '../components/home/HomeHeader';
import StartButtons from '../components/home/StartButtons';
import Divider from '../components/ui/Divider';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col gap-6 px-6">
        <HomeHeader />
        <StartButtons />
        <Divider>링크 생성이란?</Divider>
        <CreateLinkDescription />
        <p className="text-center text-text-muted text-2xs">
          자모 5개짜리 단어를 5번 안에 맞춰보세요
        </p>
      </div>
    </div>
  );
}
