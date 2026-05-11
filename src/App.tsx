import Button from './components/ui/Button';
import { Plus } from 'lucide-react';
import Tile from './components/ui/Tile';
function App() {
  return (
    <div className="flex items-center justify-center my-20">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <h1 className="font-title text-4xl text-center">JAMO5</h1>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">[Primary]</h2>
          <div className="flex gap-4 items-center">
            <Button variant="primary">Filled Button</Button>
            <Button variant="primary" appearance="outline">
              Outline Button
            </Button>
            <Button variant="primary" appearance="ghost">
              Ghost Button
            </Button>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">[Danger]</h2>
          <div className="flex gap-4 items-center">
            <Button variant="danger">Filled Button</Button>
            <Button variant="danger" appearance="outline">
              Outline Button
            </Button>
            <Button variant="danger" appearance="ghost">
              Ghost Button
            </Button>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">[Neutral]</h2>
          <div className="flex gap-4 items-center">
            <Button variant="neutral">Filled Button</Button>
            <Button variant="neutral" appearance="outline">
              Outline Button
            </Button>
            <Button variant="neutral" appearance="ghost">
              Ghost Button
            </Button>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">[Size]</h2>
          <div className="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">[Icon]</h2>
          <div className="flex gap-4 items-center">
            <Button icon={<Plus />}>Add</Button>
            <Button icon={<Plus />} iconPosition="right">
              Add
            </Button>
            <Button icon={<Plus />} />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">Tile</h2>
          <div className="flex gap-4 items-center">
            <Tile state="empty" />
            <Tile state="active" />
            <Tile letter="ㄷ" state="filled" />
            <Tile letter="ㄹ" state="correct" />
            <Tile letter="ㅁ" state="present" />
            <Tile letter="ㅂ" state="absent" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
