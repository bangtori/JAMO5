import CreateLinkDescription from '../components/home/CreateLinkDescription';
import HomeHeader from '../components/home/HomeHeader';
import StartButtons from '../components/home/StartButtons';
import Divider from '../components/ui/Divider';
import PageLayout from '../components/ui/PageLayout';

export default function HomePage() {
  return (
    <PageLayout>
      <HomeHeader />
      <StartButtons />
      <Divider>링크 생성이란?</Divider>
      <CreateLinkDescription />
      <p className="text-center text-text-muted text-2xs">
        자모 5개짜리 단어를 5번 안에 맞춰보세요
      </p>
    </PageLayout>
  );
}
